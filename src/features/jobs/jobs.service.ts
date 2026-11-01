import { ApiError } from '@/errors';
import { apiRequest } from '@/services/api';
import { ErrorCode } from '@/types/ErrorCode';

import { jobSchema, jobsListSchema, jobsQuerySchema } from './jobs.schema';
import type { Job, JobsListResult, JobsQuery } from './jobs.schema';

async function getJobs(
  query: JobsQuery = {},
  signal?: AbortSignal,
): Promise<JobsListResult> {
  const result = jobsQuerySchema.safeParse(query);

  if (!result.success) {
    throw new ApiError(422, ErrorCode.VALIDATION_ERROR);
  }

  const { q, city, salary_min, salary_max, sort, page, limit } = result.data;

  const params = new URLSearchParams({
    sort,
    page: String(page),
    limit: String(limit),
  });

  if (q) {
    params.set('q', q);
  }

  if (city) {
    params.set('city', city);
  }

  if (salary_min !== undefined) {
    params.set('salary_min', String(salary_min));
  }

  if (salary_max !== undefined) {
    params.set('salary_max', String(salary_max));
  }

  return apiRequest(`/jobs?${params.toString()}`, {
    schema: jobsListSchema,
    signal,
  });
}

async function getJobById(id: string, signal?: AbortSignal): Promise<Job> {
  if (!id.trim()) {
    throw new ApiError(422, ErrorCode.VALIDATION_ERROR);
  }

  return apiRequest(`/jobs/${encodeURIComponent(id)}`, {
    schema: jobSchema,
    signal,
  });
}

export { getJobs, getJobById };
