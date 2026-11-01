import { getErrorMessage } from '@/messages/error.messages';
import type { Locale } from '@/messages/error.messages';
import type { ErrorCode } from '@/types/ErrorCode';

class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: ErrorCode,
    locale: Locale = 'es',
  ) {
    super(getErrorMessage(code, locale));
    this.name = 'ApiError';
  }
}

export { ApiError };
