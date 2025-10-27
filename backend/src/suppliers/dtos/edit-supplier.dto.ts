import z from 'zod';
import { supplierStatusValues } from '../../constants';

export const editSupplierSchema = z.object({
  status: z.enum(supplierStatusValues).optional(),
  companyName: z
    .string()
    .min(2, 'Company name must be at least 2 characters long')
    .max(50)
    .optional(),
  mainContactName: z
    .string()
    .min(2, 'Main contact name must be at least 2 characters long')
    .max(50)
    .optional(),
  address: z.string().max(200).optional(),
  email: z.email().optional(),
  phoneNumber: z.string().optional(),
});

export type EditSupplierDto = z.infer<typeof editSupplierSchema>;
