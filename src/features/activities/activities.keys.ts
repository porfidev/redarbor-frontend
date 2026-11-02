import type { ActivityKind } from './activities.service';

const activityKeys = {
  all: ['activities'] as const,
  list: (userId: string | undefined, kind: ActivityKind) =>
    ['activities', userId, kind] as const,
};

export { activityKeys };
