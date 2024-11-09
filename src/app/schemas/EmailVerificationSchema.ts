import { z } from 'zod';
import { VALIDATION_ERROR_MESSAGES } from '@/lib/constants';

export const emailVerificationSchema = z.object({
  token: z.string({
    required_error: VALIDATION_ERROR_MESSAGES.REQUIRED,
    invalid_type_error: VALIDATION_ERROR_MESSAGES.INVALID_STRING,
  }),
});
