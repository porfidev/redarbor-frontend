import { z } from 'zod';

const jobSortSchema = z.enum([
  'date_desc',
  'date_asc',
  'salary_desc',
  'salary_asc',
  'relevance',
]);

const jobSchema = z.object({
  id: z.string().min(1),
  title: z.string(),
  company: z.string(),
  city: z.string(),
  salary: z.number().nullable(),
  description: z.string(),
  publishedAt: z.iso.datetime({ offset: true }),
  tags: z.array(z.string()),
  createdAt: z.iso.datetime({ offset: true }),
  updatedAt: z.iso.datetime({ offset: true }),
});

const jobsListSchema = z.object({
  items: z.array(jobSchema),
  pagination: z.object({
    page: z.number().int().positive(),
    limit: z.number().int().positive(),
    total: z.number().int().nonnegative(),
    totalPages: z.number().int().nonnegative(),
  }),
});

const jobsQuerySchema = z
  .object({
    q: z.string().trim().optional(),
    city: z.string().trim().optional(),
    salary_min: z.number().nonnegative().optional(),
    salary_max: z.number().nonnegative().optional(),
    sort: jobSortSchema.default('date_desc'),
    page: z.number().int().min(1).max(Number.MAX_SAFE_INTEGER).default(1),
    limit: z.number().int().min(1).max(100).default(20),
  })
  .refine(
    ({ salary_min, salary_max }) =>
      salary_min === undefined ||
      salary_max === undefined ||
      salary_min <= salary_max,
    {
      path: ['salary_max'],
      message: 'salary_max debe ser mayor o igual a salary_min',
    },
  )
  .refine(({ page, limit }) => Number.isSafeInteger((page - 1) * limit), {
    path: ['page'],
    message: 'La página solicitada es demasiado grande',
  });

type Job = z.infer<typeof jobSchema>;
type JobSort = z.infer<typeof jobSortSchema>;
type JobsListResult = z.infer<typeof jobsListSchema>;
type JobsQuery = z.input<typeof jobsQuerySchema>;

export { jobSchema, jobSortSchema, jobsListSchema, jobsQuerySchema };
export type { Job, JobSort, JobsListResult, JobsQuery };
