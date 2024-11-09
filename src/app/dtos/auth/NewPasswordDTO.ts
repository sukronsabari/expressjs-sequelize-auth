import { z } from 'zod';
import { newPasswordSchema } from '@/app/schemas/NewPasswordSchema';

export type NewPasswordDTO = z.infer<typeof newPasswordSchema>;
