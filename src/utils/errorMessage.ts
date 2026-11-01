import { ApiError } from '@/errors';
import { getErrorMessage } from '@/messages/error.messages';
import { ErrorCode } from '@/types/ErrorCode';

function errorMessage(error: unknown): string {
  return error instanceof ApiError
    ? error.message
    : getErrorMessage(ErrorCode.INTERNAL_ERROR);
}

export { errorMessage };
