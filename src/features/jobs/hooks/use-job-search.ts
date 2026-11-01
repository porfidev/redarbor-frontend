import {
  hashKey,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import { useEffect, useMemo, useRef } from 'react';

import { ApiError } from '@/errors';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { ErrorCode } from '@/types/ErrorCode';

import { jobsQuerySchema } from '../jobs.schema';
import type { JobsListResult, JobsQuery } from '../jobs.schema';
import { getJobs } from '../jobs.service';

type JobsSearchFilters = Omit<JobsQuery, 'page'>;

const jobKeys = {
  all: ['jobs'] as const,
  search: (filters: JobsSearchFilters) => ['jobs', 'search', filters] as const,
  detail: (id: string) => ['jobs', 'detail', id] as const,
};

function useJobSearch(
  filters: JobsSearchFilters = {},
  options: { enabled?: boolean; resetOnChange?: boolean } = {},
) {
  const searchText = filters.q?.trim() ?? '';
  const debouncedSearch = useDebouncedValue(searchText, 300);
  const isDebouncing = searchText !== debouncedSearch;

  const result = jobsQuerySchema.safeParse({
    ...filters,
    q: debouncedSearch || undefined,
    city: filters.city?.trim() || undefined,
    page: 1,
  });

  const isValid = result.success;
  const normalizedFilters: JobsSearchFilters = result.success
    ? {
        q: result.data.q,
        city: result.data.city,
        salary_min: result.data.salary_min,
        salary_max: result.data.salary_max,
        sort: result.data.sort,
        limit: result.data.limit,
      }
    : filters;

  const queryKey = jobKeys.search(normalizedFilters);
  const client = useQueryClient();
  const previousKey = useRef(queryKey);
  useEffect(() => {
    const previous = previousKey.current;
    previousKey.current = queryKey;
    if (
      options.resetOnChange === false ||
      hashKey(previous) === hashKey(queryKey)
    )
      return;
    // Keep the first cached page, so returning to an old filter starts at page one.
    void client.cancelQueries({ queryKey: previous, exact: true });
    client.setQueryData<InfiniteData<JobsListResult>>(previous, (data) =>
      data
        ? {
            pages: data.pages.slice(0, 1),
            pageParams: data.pageParams.slice(0, 1),
          }
        : undefined,
    );
  }, [client, queryKey, options.resetOnChange]);
  const query = useInfiniteQuery({
    queryKey,
    initialPageParam: 1,
    queryFn: ({ pageParam, signal }) =>
      getJobs({ ...normalizedFilters, page: pageParam }, signal),
    getNextPageParam: ({ pagination }) =>
      pagination.page < pagination.totalPages ? pagination.page + 1 : undefined,
    enabled: options.enabled !== false && isValid && !isDebouncing,
    refetchOnWindowFocus: false,
  });

  const jobs = useMemo(
    () =>
      isValid && !isDebouncing
        ? (query.data?.pages.flatMap((page) => page.items) ?? [])
        : [],
    [query.data, isValid, isDebouncing],
  );

  async function loadMore(): Promise<void> {
    if (!isValid || isDebouncing || !query.hasNextPage || query.isFetching) {
      return;
    }

    await query.fetchNextPage({ cancelRefetch: false });
  }

  return {
    ...query,
    jobs,
    queryKey,
    filters: normalizedFilters,
    total:
      isValid && !isDebouncing
        ? (query.data?.pages[0]?.pagination.total ?? 0)
        : 0,
    isDebouncing,
    validationError: isValid
      ? undefined
      : new ApiError(422, ErrorCode.VALIDATION_ERROR),
    loadMore,
  };
}

export { useJobSearch, jobKeys };
export type { JobsSearchFilters };
