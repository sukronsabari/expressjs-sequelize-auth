import { z } from 'zod';
import { VALIDATION_ERROR_MESSAGES } from '@/lib/constants';

export const sendPasswordResetLinkSchema = z.object({
  email: z
    .string({
      required_error: VALIDATION_ERROR_MESSAGES.REQUIRED,
      invalid_type_error: VALIDATION_ERROR_MESSAGES.INVALID_STRING,
    })
    .email({
      message: VALIDATION_ERROR_MESSAGES.INVALID_EMAIL,
    }),
});
