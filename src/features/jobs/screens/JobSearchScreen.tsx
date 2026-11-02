import { Spacer } from '@/components/Spacer';
import { FiltersHeader } from '@/features/jobs/components/FiltersHeader';
import { JobCard } from '@/features/jobs/components/JobCard';
import { JobCardSkeleton } from '@/features/jobs/components/JobCardSkeleton';
import { JobsEmptyState } from '@/features/jobs/components/JobsEmptyState';
import { JobsErrorState } from '@/features/jobs/components/JobsErrorState';
import {
  initialSearchForm,
  JobSearchControls,
} from '@/features/jobs/components/JobSearchControl';
import type { SearchForm } from '@/features/jobs/components/JobSearchControl';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDetailStore } from '../detail.store';
import { FlashList } from '@shopify/flash-list';
import type { FlashListRef } from '@shopify/flash-list';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';

import { ApiError } from '@/errors';
import { getErrorMessage } from '@/messages/error.messages';
import { ErrorCode } from '@/types/ErrorCode';

import { useJobSearch } from '../hooks/use-job-search';
import type { Job } from '../jobs.schema';

function parseSalary(value: string): number | undefined {
  const trimmed = value.trim();

  if (!trimmed) {
    return undefined;
  }

  if (!/^\d+(?:[.,]\d+)?$/.test(trimmed)) {
    return Number.NaN;
  }

  return Number(trimmed.replace(',', '.'));
}

function getSearchError(error: unknown): string {
  return error instanceof ApiError
    ? error.message
    : getErrorMessage(ErrorCode.INTERNAL_ERROR);
}

function JobSearchScreen() {
  const [form, setForm] = useState<SearchForm>(initialSearchForm);
  const listRef = useRef<FlashListRef<Job>>(null);
  const visibleIds = useRef(new Set<string>());
  const closedId = useDetailStore((state) => state.lastClosedId);
  const handledClose = useRef<string | undefined>(undefined);

  function handleClearFilters() {
    setForm((current) => ({
      ...current,
      city: initialSearchForm.city,
      salaryMin: initialSearchForm.salaryMin,
      salaryMax: initialSearchForm.salaryMax,
    }));
  }

  const search = useJobSearch({
    q: form.q,
    city: form.city,
    salary_min: parseSalary(form.salaryMin),
    salary_max: parseSalary(form.salaryMax),
    sort: form.sort,
    limit: 20,
  });

  const isLoadingResults =
    !search.validationError &&
    (search.isDebouncing ||
      search.isPending ||
      (search.isFetching && !search.isFetchingNextPage));

  useEffect(() => {
    listRef.current?.scrollToOffset({
      offset: 0,
      animated: false,
    });
  }, [form.q, form.city, form.salaryMin, form.salaryMax, form.sort]);

  useEffect(() => {
    if (!closedId) {
      handledClose.current = undefined;
      return;
    }
    if (handledClose.current === closedId) return;
    if (visibleIds.current.has(closedId)) {
      handledClose.current = closedId;
      return;
    }
    const index = search.jobs.findIndex((job) => job.id === closedId);
    if (index >= 0) {
      handledClose.current = closedId;
      void listRef.current?.scrollToIndex({ index, animated: false });
    }
  }, [closedId, search.jobs]);

  function renderEmptyState() {
    if (search.validationError) {
      return (
        <Text accessibilityRole="alert">{search.validationError.message}</Text>
      );
    }

    if (isLoadingResults) {
      return (
        <View
          style={{ paddingHorizontal: 12 }}
          accessibilityLabel="Buscando vacantes"
          accessibilityState={{ busy: true }}
        >
          <JobCardSkeleton />
          <JobCardSkeleton />
          <JobCardSkeleton />
        </View>
      );
    }

    if (search.isError) {
      return (
        <JobsErrorState
          onRetry={() => {
            void search.refetch();
          }}
        />
      );
    }

    return <JobsEmptyState onClear={handleClearFilters} />;
  }

  function renderFooter() {
    if (
      search.jobs.length === 0 ||
      isLoadingResults ||
      (search.isError && !search.isFetchNextPageError) ||
      search.validationError ||
      search.isDebouncing
    ) {
      return null;
    }

    if (search.isFetchingNextPage) {
      return <ActivityIndicator accessibilityLabel="Cargando más vacantes" />;
    }

    if (search.isFetchNextPageError) {
      return (
        <View>
          <Text accessibilityRole="alert">{getSearchError(search.error)}</Text>
          <Button
            title="Reintentar cargar más"
            onPress={() => {
              void search.loadMore();
            }}
          />
        </View>
      );
    }

    if (search.isRefetchError) {
      return (
        <View>
          <Text accessibilityRole="alert">{getSearchError(search.error)}</Text>
          <Button
            title="Reintentar actualización"
            onPress={() => {
              void search.refetch();
            }}
          />
        </View>
      );
    }

    return search.hasNextPage ? null : (
      <Text>Llegaste al final de los resultados.</Text>
    );
  }

  return (
    <FlashList
      style={{
        overflow: 'visible',
      }}
      ref={listRef}
      data={
        isLoadingResults || (search.isError && !search.isFetchNextPageError)
          ? []
          : search.jobs
      }
      keyExtractor={(job) => job.id}
      renderItem={({ item }) => (
        <View style={{ paddingHorizontal: 12 }}>
          <JobCard
            job={item}
            onOpen={() =>
              useDetailStore
                .getState()
                .open(item.id, { jobs: search.jobs, filters: search.filters })
            }
          />
        </View>
      )}
      onViewableItemsChanged={({ viewableItems }) => {
        visibleIds.current = new Set(viewableItems.map(({ item }) => item.id));
      }}
      keyboardShouldPersistTaps="handled"
      maintainVisibleContentPosition={{ disabled: true }}
      ListHeaderComponent={
        <View style={{ paddingHorizontal: 12 }}>
          <JobSearchControls
            value={form}
            onChange={setForm}
            onClear={handleClearFilters}
            sortDisabled={
              !isLoadingResults &&
              !search.validationError &&
              search.isSuccess &&
              search.jobs.length === 0
            }
          />

          {!search.validationError ? (
            <>
              <Spacer />
              <FiltersHeader
                title={
                  isLoadingResults
                    ? 'Buscando Vacantes'
                    : search.isError
                      ? 'Estado de la búsqueda'
                      : 'Vacantes encontradas'
                }
                fontSize={24}
                icon={
                  <MaterialCommunityIcons
                    name={
                      isLoadingResults
                        ? 'magnify'
                        : search.isError
                          ? 'cloud-off-outline'
                          : 'view-agenda-outline'
                    }
                    size={26}
                    color={
                      !isLoadingResults && search.isError
                        ? '#C51C1C'
                        : '#0058BE'
                    }
                  />
                }
              />
            </>
          ) : null}
        </View>
      }
      ListEmptyComponent={renderEmptyState()}
      ListFooterComponent={renderFooter()}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (!isLoadingResults && !search.isFetchNextPageError) {
          void search.loadMore();
        }
      }}
    />
  );
}

export { JobSearchScreen };
