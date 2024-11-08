import { z } from 'zod';
import { AddSalesPersonSchema } from '@/app/schemas/AddSalesPersonSchema';

export type AddSalePersonDTO = z.infer<typeof AddSalesPersonSchema>;
