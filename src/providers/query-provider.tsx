import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { AppState, Platform } from 'react-native';

import { ApiError } from '@/errors';
import { useSessionStore } from '@/features/auth/auth.store';

function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        gcTime: 5 * 60_000,
        retry: (failureCount, error) =>
          failureCount < 2 &&
          error instanceof ApiError &&
          (error.status === 0 || error.status >= 500),
      },
      mutations: { retry: false },
    },
  });
}

function QueryProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(createQueryClient);

  useEffect(
    () =>
      useSessionStore.subscribe((state, previous) => {
        if (state.accessToken !== previous.accessToken) {
          void queryClient.cancelQueries({ queryKey: ['activities'] });
          queryClient.removeQueries({ queryKey: ['activities'] });
        }
      }),
    [queryClient],
  );

  useEffect(() => {
    // The web implementation already listens to browser focus events.
    if (Platform.OS === 'web') {
      return;
    }

    const subscription = AppState.addEventListener('change', (state) => {
      focusManager.setFocused(state === 'active');
    });

    return () => subscription.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export { QueryProvider, createQueryClient };
