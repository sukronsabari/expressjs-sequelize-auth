import { z } from 'zod';
import { ERROR_MESSAGES } from '@/lib/constants';

export const AddSalesPersonSchema = z.object({
  name: z
    .string({
      required_error: ERROR_MESSAGES.REQUIRED,
      invalid_type_error: ERROR_MESSAGES.INVALID_STRING,
    })
    .min(3, { message: ERROR_MESSAGES.INVALID_MIN_LENGTH }),
});
