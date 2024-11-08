import { z } from 'zod';
import { RegisterSchema } from '@/app/schemas/RegisterSchema';

export type RegisterDTO = z.infer<typeof RegisterSchema>;
