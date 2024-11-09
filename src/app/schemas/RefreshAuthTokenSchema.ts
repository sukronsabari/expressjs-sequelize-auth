import { z } from 'zod';
import { VALIDATION_ERROR_MESSAGES } from '@/lib/constants';

export const refreshAuthTokenSchema = z.object({
  refresh_token: z.string({
    required_error: VALIDATION_ERROR_MESSAGES.REQUIRED,
    invalid_type_error: VALIDATION_ERROR_MESSAGES.INVALID_STRING,
  }),
});
