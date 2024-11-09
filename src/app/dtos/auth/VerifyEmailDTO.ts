import { z } from 'zod';
import { emailVerificationSchema } from '@/app/schemas/EmailVerificationSchema';

export type VerifyEmailDTO = z.infer<typeof emailVerificationSchema>;
