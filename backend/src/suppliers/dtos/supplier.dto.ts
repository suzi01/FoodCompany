import { z } from 'zod';
import { supplierStatusValues } from '../../constants';

export const supplierSchema = z.object({
  id: z.string(),
  status: z.enum(supplierStatusValues),
  companyName: z
    .string()
    .min(2, 'Company name must be at least 2 characters long')
    .max(50),
  mainContactName: z
    .string()
    .min(2, 'Main contact name must be at least 2 characters long')
    .max(50),
  address: z.string().max(200).optional(),
  email: z.email(),
  phoneNumber: z.string().optional(),
  productsProvided: z.array(z.string()),
  branches: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SupplierDto = z.infer<typeof supplierSchema>;
