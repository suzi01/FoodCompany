import { z } from 'zod';

export const addProductsSchema = z.object({
  id: z.string(),
  productsProvided: z.array(z.string()),
});

export type AddProductsToSupplierDto = z.infer<typeof addProductsSchema>;
