import z from 'zod';

export const createBranchSchema = z.object({
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
  suppliers: z.array(z.string()).optional().default([]),
  yearsActive: z.number().min(0).default(0),
  inventory: z
    .array(
      z.object({
        product: z.string(),
        quantity: z.number().min(0),
        lastRestocked: z.string(),
      }),
    )
    .optional()
    .default([]),
});

export type CreateBranchDto = z.infer<typeof createBranchSchema>;
