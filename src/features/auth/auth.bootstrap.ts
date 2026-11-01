import { ApiError } from '@/errors';
import { configureAuthApiSession } from '@/features/auth/auth.api-session';
import { getCurrentUser } from '@/features/auth/auth.service';
import { useSessionStore } from '@/features/auth/auth.store';
import { ErrorCode } from '@/types/ErrorCode';

let initialization: Promise<void> | undefined;

async function restoreSession(): Promise<void> {
  configureAuthApiSession();

  if (!useSessionStore.persist.hasHydrated()) {
    await useSessionStore.persist.rehydrate();

    if (!useSessionStore.persist.hasHydrated()) {
      throw new ApiError(0, ErrorCode.INTERNAL_ERROR);
    }
  }

  const session = useSessionStore.getState();
  const token = session.accessToken;

  if (!token) {
    session.clearSession();
    return;
  }

  try {
    const user = await getCurrentUser();
    const currentSession = useSessionStore.getState();

    if (currentSession.accessToken === token) {
      currentSession.setSession({
        accessToken: token,
        user,
      });
    }
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      const currentSession = useSessionStore.getState();

      if (currentSession.accessToken === token) {
        currentSession.clearSession();
      }

      return;
    }

    throw error;
  }
}

function initializeAuth(): Promise<void> {
  configureAuthApiSession();
  if (initialization) {
    return initialization;
  }

  if (useSessionStore.getState().status !== 'checking') {
    return Promise.resolve();
  }

  initialization = restoreSession().finally(() => {
    initialization = undefined;
  });

  return initialization;
}

export { initializeAuth };
