import { beforeEach, expect, jest, test } from '@jest/globals';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { useSessionStore } from '@/features/auth/auth.store';
import type { Job } from '@/features/jobs/jobs.schema';
import { changeActivity } from './activities.service';
import { activityKeys, useActivityMutation } from './activities.hooks';

jest.mock('./activities.service', () => ({
  changeActivity: jest.fn(),
  getActivities: jest.fn(),
}));
const mockChange = jest.mocked(changeActivity);
const user = { id: '1', email: 'test@occ.com.mx', name: 'Test' };
const job: Job = {
  id: 'job-1',
  title: 'Developer',
  company: 'Test',
  city: 'Monterrey',
  salary: null,
  description: '',
  tags: [],
  publishedAt: '2026-10-30T00:00:00Z',
  createdAt: '2026-10-30T00:00:00Z',
  updatedAt: '2026-10-30T00:00:00Z',
};

beforeEach(() => {
  useSessionStore.getState().setSession({ accessToken: 'token', user });
});

test('optimistically removes a favorite and restores it if the request fails', async () => {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: Infinity },
      mutations: { retry: false, gcTime: 0 },
    },
  });
  const key = activityKeys.list(user.id, 'favorites');
  client.setQueryData(key, [job]);
  let rejectRequest: (reason: Error) => void = () => {};
  mockChange.mockImplementation(
    () =>
      new Promise<void>((_resolve, reject) => {
        rejectRequest = reject;
      }),
  );
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
  }
  const { result, unmount } = await renderHook(
    () => useActivityMutation('favorites'),
    { wrapper: Wrapper },
  );
  let pending: Promise<unknown> = Promise.resolve();
  await act(async () => {
    pending = result.current
      .mutateAsync({ job, action: 'remove' })
      .catch((error: unknown) => error);
  });
  await waitFor(() => expect(client.getQueryData(key)).toEqual([]));
  // Another operation must survive this request's rollback.
  client.setQueryData(key, [{ ...job, id: 'job-2' }]);
  await act(async () => {
    rejectRequest(new Error('Offline'));
    await pending;
  });
  await waitFor(() =>
    expect(
      client
        .getQueryData<Job[]>(key)
        ?.map((item) => item.id)
        .sort(),
    ).toEqual(['job-1', 'job-2']),
  );
  await unmount();
  client.clear();
});
