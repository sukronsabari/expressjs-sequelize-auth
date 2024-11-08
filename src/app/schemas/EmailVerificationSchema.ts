import { z } from 'zod';
import { ERROR_MESSAGES } from '@/lib/constants';

export const EmailVerificationSchema = z.object({
  token: z.string({
    required_error: ERROR_MESSAGES.REQUIRED,
    invalid_type_error: ERROR_MESSAGES.INVALID_STRING,
  }),
});
