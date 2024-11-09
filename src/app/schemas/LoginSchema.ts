import { z } from 'zod';
import { VALIDATION_ERROR_MESSAGES } from '@/lib/constants';

export const loginSchema = z.object({
  email: z
    .string({
      required_error: VALIDATION_ERROR_MESSAGES.REQUIRED,
      invalid_type_error: VALIDATION_ERROR_MESSAGES.INVALID_STRING,
    })
    .email({ message: VALIDATION_ERROR_MESSAGES.INVALID_EMAIL }),
  password: z
    .string({
      required_error: VALIDATION_ERROR_MESSAGES.REQUIRED,
      invalid_type_error: VALIDATION_ERROR_MESSAGES.INVALID_STRING,
    })
    .min(6, { message: VALIDATION_ERROR_MESSAGES.INVALID_MIN_LENGTH }),
  // .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
  // .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
  // .regex(/[0-9]/, 'Password must contain at least one number.'),
});
