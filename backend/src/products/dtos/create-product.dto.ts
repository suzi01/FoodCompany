import z from 'zod';

export const createProductSchema = z.object({
  name: z
    .string()
    .min(2, 'Product name must be at least 2 characters long')
    .max(100),
  category: z.string().min(2).max(50),
  supplier: z.string().min(2).max(50),
  idOrBarcode: z.string().min(2).max(50),
  price: z.number().min(0, 'Price must be a positive number'),
  description: z.string().max(500),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;
