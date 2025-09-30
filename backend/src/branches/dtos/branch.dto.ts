import z from "zod";

export const branchSchema = z.object({
    id:z.string(),
    branchName: z.string().min(2, 'Branch name must be at least 2 characters long').max(50),
    mainContactName: z.string().min(2).max(50).optional(),
    mainContactPhoneNumber: z.string().regex(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/, 'Enter a valid phone number').optional(),
    mainContactEmail: z.email().optional(),
    branchEmail: z.email('Enter a valid branch email'),
   phoneNumber: z.string().regex(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/, 'Enter a valid phone number').optional(),
    address: z.string().optional(),
    yearsActive: z.number().min(0),
    suppliers: z.array(z.string()),
    createdAt: z.string(),
    updatedAt: z.string()
})

export type BranchDto = z.infer<typeof branchSchema>;