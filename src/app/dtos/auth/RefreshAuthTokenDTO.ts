import { z } from 'zod';
import { RefreshAuthTokenSchema } from '@/app/schemas/RefreshAuthTokenSchema';

export type RefreshAuthTokenDTO = z.infer<typeof RefreshAuthTokenSchema>;
