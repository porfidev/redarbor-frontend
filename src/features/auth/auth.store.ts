import type { User } from '@/features/auth/auth.schema';
import { userSchema } from '@/features/auth/auth.schema';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { z } from 'zod';

type SessionStatus = 'checking' | 'authenticated' | 'anonymous';

type Session = {
  accessToken: string;
  user: User;
};

type SessionStore = {
  accessToken: string | undefined;
  user: User | undefined;
  status: SessionStatus;
  setSession: (session: Session) => void;
  clearSession: () => void;
};

const persistedSessionSchema = z.object({
  accessToken: z.string().min(1),
  user: userSchema,
});

const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      accessToken: undefined,
      user: undefined,
      status: 'checking',
      setSession: ({ accessToken, user }: Session) => {
        set({
          accessToken,
          user,
          status: 'authenticated',
        });
      },
      clearSession: () =>
        set({
          accessToken: undefined,
          user: undefined,
          status: 'anonymous',
        }),
    }),
    {
      name: 'redarbor-session',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      skipHydration: true,

      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
      }),

      merge: (persistedState, currentState) => {
        const result = persistedSessionSchema.safeParse(persistedState);

        if (!result.success) {
          return currentState;
        }

        return {
          ...currentState,
          accessToken: result.data.accessToken,
          user: result.data.user,
        };
      },
    },
  ),
);

export { useSessionStore };
export type { SessionStore, SessionStatus };
