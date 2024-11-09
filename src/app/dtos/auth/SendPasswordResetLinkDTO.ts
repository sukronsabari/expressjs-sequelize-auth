import { z } from 'zod';
import { sendPasswordResetLinkSchema } from '@/app/schemas/SendPasswordResetLinkSchema';

export type SendPasswordResetLinkDTO = z.infer<typeof sendPasswordResetLinkSchema>;
