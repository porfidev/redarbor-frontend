import { useSessionStore } from '@/features/auth/auth.store';
import { configureApiSession } from '@/services/api';

function configureAuthApiSession() {
  configureApiSession({
    getToken: () => useSessionStore.getState().accessToken,
    onUnauthorized: (requestToken) => {
      const session = useSessionStore.getState();

      if (session.accessToken === requestToken) {
        session.clearSession();
      }
    },
  });
}

export { configureAuthApiSession };
