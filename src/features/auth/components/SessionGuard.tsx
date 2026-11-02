import { styles } from './SessionGuard.styles';
import { ApiError } from '@/errors';
import { initializeAuth } from '@/features/auth/auth.bootstrap';
import { useSessionStore } from '@/features/auth/auth.store';
import { getErrorMessage } from '@/messages/error.messages';
import { ErrorCode } from '@/types/ErrorCode';
import { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';

type SessionGuardProps = PropsWithChildren;

function getStartupError(error: unknown): string {
  return error instanceof ApiError
    ? error.message
    : getErrorMessage(ErrorCode.INTERNAL_ERROR);
}

function SessionGuard({ children }: SessionGuardProps) {
  const status = useSessionStore((state) => state.status);
  const [startupError, setStartupError] = useState<string>();

  useEffect(() => {
    let active = true;

    initializeAuth().catch((error: unknown) => {
      if (active) {
        setStartupError(getStartupError(error));
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const handleRetry = () => {
    setStartupError(undefined);

    initializeAuth().catch((error: unknown) => {
      setStartupError(getStartupError(error));
    });
  };

  if (status !== 'checking') {
    return children;
  }

  return (
    <View style={styles.container}>
      {startupError ? (
        <>
          <Text>{startupError}</Text>
          <Button title={'Reintentar'} onPress={handleRetry} />
        </>
      ) : (
        <>
          <ActivityIndicator
            size="large"
            accessibilityLabel="Validando sesión"
          />
          <Text>Preparando tu sesión…</Text>
        </>
      )}
    </View>
  );
}

export { SessionGuard };
