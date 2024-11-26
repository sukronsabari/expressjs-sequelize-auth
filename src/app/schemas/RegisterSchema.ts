import { z } from 'zod';
import { VALIDATION_ERROR_MESSAGES } from '@/lib/constants';

export const registerSchema = z
  .object({
    name: z
      .string({
        required_error: VALIDATION_ERROR_MESSAGES.REQUIRED,
        invalid_type_error: VALIDATION_ERROR_MESSAGES.INVALID_STRING,
      })
      .min(3, { message: VALIDATION_ERROR_MESSAGES.INVALID_MIN_LENGTH }),
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
      .min(6, { message: VALIDATION_ERROR_MESSAGES.INVALID_MIN_LENGTH })
      .regex(/[a-z]/, { message: VALIDATION_ERROR_MESSAGES.PASSWORD_REQUIRE_LOWERCASE_CHAR })
      .regex(/[A-Z]/, { message: VALIDATION_ERROR_MESSAGES.PASSWORD_REQUIRE_UPPERCASE_CHAR })
      .regex(/[0-9]/, { message: VALIDATION_ERROR_MESSAGES.PASSWORD_REQUIRE_NUMERIC_CHAR }),
    password_confirmation: z.string({
      required_error: VALIDATION_ERROR_MESSAGES.REQUIRED,
      invalid_type_error: VALIDATION_ERROR_MESSAGES.INVALID_STRING,
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ['password_confirmation'],
    message: VALIDATION_ERROR_MESSAGES.PASSWORD_MISMATCH,
  });
