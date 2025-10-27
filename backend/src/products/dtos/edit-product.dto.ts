import z from 'zod';

export const editProductSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  category: z.string().min(2).max(50).optional(),
  supplier: z.string().min(2).max(50).optional(),
  idOrBarcode: z.string().min(2).max(50).optional(),
  price: z.number().min(0).optional(),
  quantityInStock: z.number().int().min(0).optional(),
  description: z.string().max(500).optional(),
});

export type EditProductDto = z.infer<typeof editProductSchema>;
