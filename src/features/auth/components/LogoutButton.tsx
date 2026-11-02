import { ApiError } from '@/errors';
import { logout } from '@/features/auth/auth.service';
import { useSessionStore } from '@/features/auth/auth.store';
import { getErrorMessage } from '@/messages/error.messages';
import { ErrorCode } from '@/types/ErrorCode';
import { useRef, useState } from 'react';
import { Button, View, Text } from 'react-native';

function LogoutButton() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const submitting = useRef(false);

  async function handleLogout() {
    if (submitting.current) {
      return;
    }

    const token = useSessionStore.getState().accessToken;

    submitting.current = true;
    setIsSubmitting(true);
    setErrorMessage(undefined);

    try {
      await logout();

      const session = useSessionStore.getState();

      if (session.accessToken === token) {
        session.clearSession();
      }
    } catch (error) {
      if (!(error instanceof ApiError && error.status === 401)) {
        setErrorMessage(
          error instanceof ApiError
            ? error.message
            : getErrorMessage(ErrorCode.INTERNAL_ERROR),
        );
      }
    } finally {
      submitting.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <View>
      {errorMessage ? <Text>{errorMessage}</Text> : null}

      <Button
        title={isSubmitting ? 'Cerrando sesion...' : 'Cerrar sesión'}
        disabled={isSubmitting}
        onPress={handleLogout}
      />
    </View>
  );
}

export { LogoutButton };
