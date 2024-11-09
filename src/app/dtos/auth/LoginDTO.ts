import { z } from 'zod';
import { loginSchema } from '@/app/schemas/LoginSchema';

export type LoginDTO = z.infer<typeof loginSchema>;
