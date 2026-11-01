import { env } from '@/config/env';
import { ApiError } from '@/errors';
import { apiErrorSchema } from '@/schemas/api.schema';
import { ErrorCode } from '@/types/ErrorCode';
import { z } from 'zod';

type SessionHandlers = {
  getToken: () => string | undefined;
  onUnauthorized: (token: string) => void;
};

type ApiRequestOptions<T> = {
  schema: z.ZodType<T>;
  method?: 'GET' | 'POST' | 'DELETE';
  body?: unknown;
  authenticated?: boolean;
  signal?: AbortSignal;
};

let sessionHandlers: SessionHandlers = {
  getToken: () => undefined,
  onUnauthorized: () => {},
};

function configureApiSession(handlers: SessionHandlers): void {
  sessionHandlers = handlers;
}

async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions<T>,
): Promise<T> {
  const {
    schema,
    method = 'GET',
    body,
    authenticated = false,
    signal,
  } = options;

  const token = authenticated ? sessionHandlers.getToken() : null;

  if (authenticated && !token) {
    throw new ApiError(401, ErrorCode.AUTH_REQUIRED);
  }

  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const baseUrl = env.apiBaseUrl.replace(/\/+$/, '');
  const normalizedPath = path.replace(/^\/+/, '');

  let response: Response;

  try {
    response = await fetch(`${baseUrl}/${normalizedPath}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal,
    });
  } catch (error) {
    if (signal?.aborted) {
      throw error;
    }

    throw new ApiError(0, ErrorCode.NETWORK_ERROR);
  }

  if (response.status === 401 && authenticated && token) {
    sessionHandlers.onUnauthorized(token);
  }

  let payload: unknown;

  try {
    payload = await response.json();
  } catch (error) {
    if (signal?.aborted) {
      throw error;
    }

    throw new ApiError(response.status, ErrorCode.INVALID_RESPONSE);
  }

  const serverError = apiErrorSchema.safeParse(payload);

  if (serverError.success) {
    throw new ApiError(response.status, serverError.data.error.code);
  }

  if (!response.ok) {
    throw new ApiError(response.status, ErrorCode.HTTP_ERROR);
  }

  const successSchema = z.object({
    ok: z.literal(true),
    data: schema,
  });

  const result = successSchema.safeParse(payload);

  if (!result.success) {
    throw new ApiError(response.status, ErrorCode.INVALID_RESPONSE);
  }

  return result.data.data;
}

export { apiRequest, configureApiSession };
export type { ApiRequestOptions, SessionHandlers };
