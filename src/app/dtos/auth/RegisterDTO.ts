import { z } from 'zod';
import { registerSchema } from '@/app/schemas/RegisterSchema';

export type RegisterDTO = z.infer<typeof registerSchema>;
