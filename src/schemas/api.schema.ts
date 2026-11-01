import { z } from 'zod';
import { ErrorCode } from '@/types/ErrorCode';

const apiErrorSchema = z.object({
  ok: z.literal(false),
  error: z.object({
    code: z.enum(ErrorCode).catch(ErrorCode.HTTP_ERROR),
    message: z.string(),
  }),
});

type ApiErrorResponse = z.infer<typeof apiErrorSchema>;

export { apiErrorSchema };
export type { ApiErrorResponse };
