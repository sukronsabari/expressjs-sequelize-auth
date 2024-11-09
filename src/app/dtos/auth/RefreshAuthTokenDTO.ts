import { z } from 'zod';
import { refreshAuthTokenSchema } from '@/app/schemas/RefreshAuthTokenSchema';

export type RefreshAuthTokenDTO = z.infer<typeof refreshAuthTokenSchema>;
