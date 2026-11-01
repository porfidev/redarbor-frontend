import { JobCard } from '@/features/jobs/components/JobCard';
import {
  initialSearchForm,
  JobSearchControls,
} from '@/features/jobs/components/JobSearchControl';
import type { SearchForm } from '@/features/jobs/components/JobSearchControl';
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

  const search = useJobSearch({
    q: form.q,
    city: form.city,
    salary_min: parseSalary(form.salaryMin),
    salary_max: parseSalary(form.salaryMax),
    sort: form.sort,
    limit: 20,
  });

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

    if (search.isDebouncing || search.isPending) {
      return (
        <View>
          <ActivityIndicator accessibilityLabel="Buscando vacantes" />
          <Text>Buscando vacantes…</Text>
        </View>
      );
    }

    if (search.isError) {
      return (
        <View>
          <Text accessibilityRole="alert">{getSearchError(search.error)}</Text>
          <Button
            title="Reintentar búsqueda"
            onPress={() => {
              void search.refetch();
            }}
          />
        </View>
      );
    }

    return <Text>No encontramos vacantes con estos filtros.</Text>;
  }

  function renderFooter() {
    if (
      search.jobs.length === 0 ||
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
      ref={listRef}
      data={search.jobs}
      keyExtractor={(job) => job.id}
      renderItem={({ item }) => (
        <JobCard
          job={item}
          onOpen={() =>
            useDetailStore
              .getState()
              .open(item.id, { jobs: search.jobs, filters: search.filters })
          }
        />
      )}
      onViewableItemsChanged={({ viewableItems }) => {
        visibleIds.current = new Set(viewableItems.map(({ item }) => item.id));
      }}
      keyboardShouldPersistTaps="handled"
      maintainVisibleContentPosition={{ disabled: true }}
      ListHeaderComponent={
        <View>
          <JobSearchControls value={form} onChange={setForm} />

          {!search.validationError && !search.isDebouncing ? (
            <Text>{search.total} vacantes encontradas</Text>
          ) : null}
        </View>
      }
      ListEmptyComponent={renderEmptyState()}
      ListFooterComponent={renderFooter()}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (!search.isFetchNextPageError) {
          void search.loadMore();
        }
      }}
    />
  );
}

export { JobSearchScreen };
