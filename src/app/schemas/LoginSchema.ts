import { z } from 'zod';
import { ERROR_MESSAGES } from '@/lib/constants';

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: ERROR_MESSAGES.REQUIRED,
      invalid_type_error: ERROR_MESSAGES.INVALID_STRING,
    })
    .email({ message: ERROR_MESSAGES.INVALID_EMAIL }),
  password: z
    .string({
      required_error: ERROR_MESSAGES.REQUIRED,
      invalid_type_error: ERROR_MESSAGES.INVALID_STRING,
    })
    .min(6, { message: ERROR_MESSAGES.INVALID_MIN_LENGTH }),
  // .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
  // .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
  // .regex(/[0-9]/, 'Password must contain at least one number.'),
});
