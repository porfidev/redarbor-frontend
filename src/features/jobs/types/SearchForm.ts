import type { JobSort } from '@/features/jobs/jobs.schema';

type SearchForm = {
  q: string;
  city: string;
  salaryMin: string;
  salaryMax: string;
  sort: JobSort;
};

export { SearchForm };
