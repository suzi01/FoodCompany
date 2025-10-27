import z from 'zod';
import { id } from 'zod/v4/locales';

export const productSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(2, 'Product name must be at least 2 characters long')
    .max(100),
  category: z.string().min(2).max(50),
  idOrBarcode: z.string().min(2).max(50),
  supplier: z.string().min(2).max(50),
  price: z.number().min(0, 'Price must be a positive number'),
  quantityInStock: z.number().int().min(0, 'Quantity must be zero or greater'),
  description: z.string().max(500),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ProductDto = z.infer<typeof productSchema>;
