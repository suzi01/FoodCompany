import z from 'zod';

export const editBranchSchema = z.object({
  branchName: z
    .string()
    .min(2, 'Branch name must be at least 2 characters long')
    .max(50)
    .optional(),
  mainContactName: z.string().min(2).max(50).optional(),
  mainContactPhoneNumber: z.string().optional(),
  mainContactEmail: z.email().optional(),
  branchEmail: z.email('Enter a valid branch email').optional(),
  phoneNumber: z
    .string()
    .regex(
      /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
      'Enter a valid phone number',
    )
    .optional(),
  address: z.string().optional(),
  suppliers: z.array(z.string()).default([]),
});

export type EditBranchDto = z.infer<typeof editBranchSchema>;
