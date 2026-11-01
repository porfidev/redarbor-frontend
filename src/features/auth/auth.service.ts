import { ApiError } from '@/errors';
import {
  loginInputSchema,
  loginResponseSchema,
  logoutResponseSchema,
  userSchema,
} from '@/features/auth/auth.schema';
import type {
  LoginInput,
  LoginResponse,
  User,
} from '@/features/auth/auth.schema';
import { apiRequest } from '@/services/api';
import { ErrorCode } from '@/types/ErrorCode';

async function login(input: LoginInput): Promise<LoginResponse> {
  const result = loginInputSchema.safeParse(input);

  if (!result.success) {
    throw new ApiError(422, ErrorCode.VALIDATION_ERROR);
  }

  return apiRequest('/auth/login', {
    method: 'POST',
    body: result.data,
    schema: loginResponseSchema,
  });
}

async function getCurrentUser(signal?: AbortSignal): Promise<User> {
  return apiRequest('/auth/me', {
    schema: userSchema,
    authenticated: true,
    signal,
  });
}

async function logout(): Promise<void> {
  await apiRequest('/auth/logout', {
    method: 'POST',
    schema: logoutResponseSchema,
    authenticated: true,
  });
}

export { login, getCurrentUser, logout };
