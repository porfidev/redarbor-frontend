import { create } from 'zustand';
import type { Job } from './jobs.schema';
import type { JobsSearchFilters } from './hooks/useJobSearch';

type DetailSource = {
  jobs: Job[];
  filters?: JobsSearchFilters;
};

type DetailStore = {
  id: string | undefined;
  source: DetailSource;
  lastClosedId: string | undefined;
  open: (id: string, source?: DetailSource) => void;
  move: (id: string) => void;
  close: () => void;
};

const useDetailStore = create<DetailStore>((set) => ({
  id: undefined,
  source: { jobs: [] },
  lastClosedId: undefined,
  open: (id, source = { jobs: [] }) =>
    set({ id, source, lastClosedId: undefined }),
  move: (id) => set({ id }),
  close: () => set((state) => ({ id: undefined, lastClosedId: state.id })),
}));

export { useDetailStore };
export type { DetailSource };
