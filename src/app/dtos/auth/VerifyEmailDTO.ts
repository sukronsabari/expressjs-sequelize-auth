import { z } from 'zod';
import { EmailVerificationSchema } from '@/app/schemas/EmailVerificationSchema';

export type VerifyEmailDTO = z.infer<typeof EmailVerificationSchema>;
