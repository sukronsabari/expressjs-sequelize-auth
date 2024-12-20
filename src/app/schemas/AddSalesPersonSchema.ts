import { z } from 'zod';
import { VALIDATION_ERROR_MESSAGES } from '@/lib/constants';

export const addSalesPersonSchema = z.object({
  name: z
    .string({
      required_error: VALIDATION_ERROR_MESSAGES.REQUIRED,
      invalid_type_error: VALIDATION_ERROR_MESSAGES.INVALID_STRING,
    })
    .min(3, { message: VALIDATION_ERROR_MESSAGES.INVALID_MIN_LENGTH }),
});
