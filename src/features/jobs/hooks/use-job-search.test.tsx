import { afterEach, beforeEach, expect, jest, test } from '@jest/globals';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { getJobs } from '../jobs.service';
import { useJobSearch } from './use-job-search';
import type { JobsSearchFilters } from './use-job-search';
import type { JobsListResult } from '../jobs.schema';

jest.mock('../jobs.service', () => ({ getJobs: jest.fn() }));
const mockedGetJobs = jest.mocked(getJobs);
const clients: QueryClient[] = [];

function wrapper({ children }: PropsWithChildren) {
  const client = clients[clients.length - 1];
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

function page(number: number): JobsListResult {
  return {
    items: [],
    pagination: { page: number, limit: 20, total: 40, totalPages: 2 },
  };
}

beforeEach(() => {
  clients.push(
    new QueryClient({
      defaultOptions: { queries: { retry: false, gcTime: 0 } },
    }),
  );
  mockedGetJobs.mockImplementation(async (query) => page(query?.page ?? 1));
});
afterEach(() => {
  clients.pop()?.clear();
  jest.useRealTimers();
});

test('loads the next page and starts a different filter at page one', async () => {
  const { result, rerender } = await renderHook(
    (filters: JobsSearchFilters) => useJobSearch(filters),
    { wrapper, initialProps: {} },
  );
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  await act(async () => {
    await result.current.loadMore();
  });
  await waitFor(() => expect(result.current.data?.pages).toHaveLength(2));
  await rerender({ city: 'Monterrey', sort: 'salary_desc' });
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data?.pages).toHaveLength(1);
  expect(mockedGetJobs).toHaveBeenLastCalledWith(
    expect.objectContaining({
      city: 'Monterrey',
      sort: 'salary_desc',
      page: 1,
    }),
    expect.anything(),
  );
  await rerender({});
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data?.pages).toHaveLength(1);
});

test('does not send invalid salary ranges', async () => {
  const { result } = await renderHook(
    () => useJobSearch({ salary_min: 500, salary_max: 100 }),
    { wrapper },
  );
  expect(result.current.validationError?.code).toBe('VALIDATION_ERROR');
  expect(mockedGetJobs).not.toHaveBeenCalled();
});

test('waits 300ms before sending a changed search', async () => {
  const { result, rerender } = await renderHook(
    (filters: JobsSearchFilters) => useJobSearch(filters),
    { wrapper, initialProps: {} },
  );
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  jest.useFakeTimers();
  mockedGetJobs.mockClear();
  await rerender({ q: 'React' });
  await act(async () => {
    jest.advanceTimersByTime(299);
  });
  expect(mockedGetJobs).not.toHaveBeenCalled();
  await act(async () => {
    jest.advanceTimersByTime(1);
  });
  expect(mockedGetJobs).toHaveBeenCalledWith(
    expect.objectContaining({ q: 'React', page: 1 }),
    expect.anything(),
  );
});
