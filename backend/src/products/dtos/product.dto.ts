import z from 'zod';

const supplierSchema = z.union([
  z.string(),
  z.object({ companyName: z.string() }),
]);

export const productSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(2, 'Product name must be at least 2 characters long')
    .max(100),
  category: z.string().min(2).max(50),
  idOrBarcode: z.string().min(2).max(50),
  supplier: z.array(supplierSchema),
  price: z.number().min(0, 'Price must be a positive number'),
  description: z.string().max(500),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ProductDto = z.infer<typeof productSchema>;
