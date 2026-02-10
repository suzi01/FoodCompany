import z from 'zod';

const baseSupplierSchema = z.object({
  companyName: z.string(),
});

const extendedSupplierSchema = baseSupplierSchema.extend({
  id: z.string(),
  status: z.enum(['Active', 'Inactive', 'Pending']),
});

export const baseBranchSchema = z.object({
  id: z.string(),
  branchName: z
    .string()
    .min(2, 'Branch name must be at least 2 characters long')
    .max(50),
  mainContactName: z.string().min(2).max(50).optional(),
  mainContactPhoneNumber: z
    .string()
    .regex(
      /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
      'Enter a valid phone number',
    )
    .optional(),
  mainContactEmail: z.email().optional(),
  branchEmail: z.email('Enter a valid branch email'),
  phoneNumber: z
    .string()
    .regex(
      /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
      'Enter a valid phone number',
    )
    .optional(),
  address: z.string().optional(),
  yearsActive: z.number().min(0),
  inventory: z.array(
    z.object({
      product: z.string(),
      quantity: z.number().min(0),
      lastRestocked: z.string(),
    }),
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const branchSchema = baseBranchSchema.extend({
  suppliers: z.array(z.union([z.string(), extendedSupplierSchema])),
});

export type BranchDto = z.infer<typeof branchSchema>;

export const branchesSchema = baseBranchSchema.extend({
  suppliers: z.array(z.union([z.string(), baseSupplierSchema])),
});

export type BranchesDto = z.infer<typeof branchesSchema>;
