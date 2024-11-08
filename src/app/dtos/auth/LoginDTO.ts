import { z } from 'zod';
import { LoginSchema } from '@/app/schemas/LoginSchema';

export type LoginDTO = z.infer<typeof LoginSchema>;
