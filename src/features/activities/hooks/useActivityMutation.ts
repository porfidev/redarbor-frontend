import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSessionStore } from '@/features/auth/auth.store';
import type { Job } from '@/features/jobs/jobs.schema';
import { activityKeys } from '../activities.keys';
import { changeActivity } from '../activities.service';
import type { ActivityAction, ActivityKind } from '../activities.service';

function useActivityMutation(kind: ActivityKind) {
  const userId = useSessionStore((state) => state.user?.id);
  const client = useQueryClient();
  const key = activityKeys.list(userId, kind);
  return useMutation({
    mutationFn: ({ job, action }: { job: Job; action: ActivityAction }) =>
      changeActivity(kind, action, job),
    onMutate: async ({ job, action }) => {
      const token = useSessionStore.getState().accessToken;
      await client.cancelQueries({ queryKey: key });
      const previous = client
        .getQueryData<Job[]>(key)
        ?.find((item) => item.id === job.id);
      client.setQueryData<Job[]>(key, (items = []) =>
        action === 'add'
          ? [...items.filter((item) => item.id !== job.id), job]
          : items.filter((item) => item.id !== job.id),
      );
      return { previous, token };
    },
    onError: (_error, { job }, context) => {
      if (context?.token !== useSessionStore.getState().accessToken) return;
      client.setQueryData<Job[]>(key, (items = []) => {
        const others = items.filter((item) => item.id !== job.id);
        return context?.previous ? [...others, context.previous] : others;
      });
    },
    onSettled: (_data, _error, _variables, context) => {
      if (context?.token === useSessionStore.getState().accessToken) {
        return client.invalidateQueries({ queryKey: key });
      }
    },
  });
}

export { useActivityMutation };
