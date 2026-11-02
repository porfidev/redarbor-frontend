import { useQuery } from '@tanstack/react-query';
import { useSessionStore } from '@/features/auth/auth.store';
import { activityKeys } from '../activities.keys';
import { getActivities } from '../activities.service';
import type { ActivityKind } from '../activities.service';

function useActivities(kind: ActivityKind) {
  const userId = useSessionStore((state) => state.user?.id);
  const status = useSessionStore((state) => state.status);
  return useQuery({
    queryKey: activityKeys.list(userId, kind),
    queryFn: ({ signal }) => getActivities(kind, signal),
    enabled: status === 'authenticated',
  });
}

export { useActivities };
