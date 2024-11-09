import { z } from 'zod';
import { addSalesPersonSchema } from '@/app/schemas/AddSalesPersonSchema';

export type AddSalePersonDTO = z.infer<typeof addSalesPersonSchema>;
