import { z } from 'zod';
import { jobSchema } from '@/features/jobs/jobs.schema';
import type { Job } from '@/features/jobs/jobs.schema';
import { apiRequest } from '@/services/api';

type ActivityKind = 'applications' | 'favorites';
type ActivityAction = 'add' | 'remove';

function getActivities(
  kind: ActivityKind,
  signal?: AbortSignal,
): Promise<Job[]> {
  return apiRequest(`/${kind}`, {
    schema: z.array(jobSchema),
    authenticated: true,
    signal,
  });
}

async function changeActivity(
  kind: ActivityKind,
  action: ActivityAction,
  job: Job,
): Promise<void> {
  const path = `/jobs/${encodeURIComponent(job.id)}/${kind === 'applications' ? 'apply' : 'favorite'}`;
  if (action === 'add') {
    await apiRequest(path, {
      method: 'POST',
      authenticated: true,
      schema: jobSchema,
    });
  } else {
    const schema: z.ZodType<unknown> =
      kind === 'applications'
        ? z.object({ cancelled: z.literal(true) })
        : z.object({ removed: z.literal(true) });
    await apiRequest(path, { method: 'DELETE', authenticated: true, schema });
  }
}

export { getActivities, changeActivity };
export type { ActivityKind, ActivityAction };
