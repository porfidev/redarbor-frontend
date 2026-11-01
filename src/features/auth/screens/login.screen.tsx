import { ApiError } from '@/errors';
import { loginInputSchema } from '@/features/auth/auth.schema';
import { login } from '@/features/auth/auth.service';
import { useSessionStore } from '@/features/auth/auth.store';
import { getErrorMessage } from '@/messages/error.messages';
import { ErrorCode } from '@/types/ErrorCode';
import { useRef, useState } from 'react';
import { Link, Redirect, useLocalSearchParams } from 'expo-router';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
} from 'react-native';

function LoginScreen() {
  const { returnTo } = useLocalSearchParams<{ returnTo?: string }>();
  const status = useSessionStore((state) => state.status);
  const setSession = useSessionStore((state) => state.setSession);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const submitting = useRef(false);

  const handleSubmit = async () => {
    if (submitting.current) {
      return;
    }

    setErrorMessage(undefined);

    const validInputInfo = loginInputSchema.safeParse({ email, password });

    if (!validInputInfo.success) {
      setErrorMessage(getErrorMessage(ErrorCode.VALIDATION_ERROR));
      return;
    }

    submitting.current = true;
    setIsSubmitting(true);

    try {
      const response = await login(validInputInfo.data);

      setSession({
        accessToken: response.accessToken,
        user: response.user,
      });
    } catch (error) {
      setErrorMessage(
        error instanceof ApiError
          ? error.message
          : getErrorMessage(ErrorCode.INTERNAL_ERROR),
      );
    } finally {
      submitting.current = false;
      setIsSubmitting(false);
    }
  };
  if (status === 'authenticated') {
    const match =
      typeof returnTo === 'string'
        ? /^\/vacante\/([^/]+)$/.exec(returnTo)
        : null;
    return match ? (
      <Redirect
        href={{ pathname: '/vacante/[id]', params: { id: match[1] } }}
      />
    ) : (
      <Redirect href="/" />
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text>Inicia sesión</Text>
        <Text>Correo electrónico</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="correo@ejemplo.com"
          keyboardType="email-address"
          accessibilityLabel="Correo electrónico"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          editable={!isSubmitting}
        />
        <TextInput
          accessibilityLabel="Contraseña"
          placeholder="Contraseña"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="current-password"
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={handleSubmit}
          secureTextEntry
          editable={!isSubmitting}
        />

        {errorMessage ? (
          <Text accessibilityRole="alert">{errorMessage}</Text>
        ) : null}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Iniciar sesión"
          accessibilityState={{ busy: isSubmitting, disabled: isSubmitting }}
          disabled={isSubmitting}
          onPress={handleSubmit}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text>Iniciar sesión</Text>
          )}
        </Pressable>
        <Link href="/" replace>
          Continuar buscando vacantes
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export { LoginScreen };
