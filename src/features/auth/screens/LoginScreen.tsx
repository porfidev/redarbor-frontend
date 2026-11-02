import { styles } from './LoginScreen.styles';
import * as componentStyles from './LoginScreen.styles';
import { Ionicons } from '@expo/vector-icons';
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
  View,
} from 'react-native';

function LoginScreen() {
  const { returnTo } = useLocalSearchParams<{ returnTo?: string }>();
  const status = useSessionStore((state) => state.status);
  const setSession = useSessionStore((state) => state.setSession);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>Iniciar Sesión</Text>
        <Text style={styles.description}>
          Ingresa tus credenciales para acceder a tus postulaciones activas,
          vacantes guardadas y notificaciones.
        </Text>
        <View style={styles.card}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Correo Electrónico</Text>
            <Text style={styles.required}>Requerido</Text>
          </View>
          <View style={styles.field}>
            <Ionicons name="mail-outline" size={23} color="#7A7985" />
            <TextInput
              style={styles.input}
              placeholderTextColor="#7A7985"
              value={email}
              onChangeText={setEmail}
              placeholder="ejemplo@redarbor.com"
              keyboardType="email-address"
              accessibilityLabel="Correo electrónico"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              editable={!isSubmitting}
            />
          </View>
          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.field}>
            <Ionicons name="key-outline" size={23} color="#7A7985" />
            <TextInput
              style={styles.input}
              placeholderTextColor="#7A7985"
              accessibilityLabel="Contraseña"
              placeholder="Contraseña"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="current-password"
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={handleSubmit}
              secureTextEntry={!showPassword}
              editable={!isSubmitting}
            />

            <Pressable
              onPress={() => setShowPassword((shown) => !shown)}
              accessibilityRole="button"
              accessibilityLabel={
                showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
              }
              style={styles.eyeButton}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="#7A7985"
              />
            </Pressable>
          </View>
          {errorMessage ? (
            <Text style={styles.error} accessibilityRole="alert">
              {errorMessage}
            </Text>
          ) : null}

          <Pressable
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.submit,
              (pressed || isSubmitting) && componentStyles.style1,
            ]}
            accessibilityLabel="Iniciar sesión"
            accessibilityState={{ busy: isSubmitting, disabled: isSubmitting }}
            disabled={isSubmitting}
            onPress={handleSubmit}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Text style={styles.submitText}>Iniciar Sesión</Text>
                <Ionicons name="arrow-forward" size={23} color="white" />
              </>
            )}
          </Pressable>
          <Link href="/" replace style={styles.continue}>
            Continuar buscando vacantes
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export { LoginScreen };
