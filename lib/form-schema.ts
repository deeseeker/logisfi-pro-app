import * as z from 'zod'

export const profileSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: 'Product Name must be at least 3 characters' }),
  lastname: z
    .string()
    .min(3, { message: 'Product Name must be at least 3 characters' }),
  password: z
    .string()
    .min(3, { message: 'Product Name must be at least 3 characters' }),
  currentPassword: z
    .string()
    .min(3, { message: 'Product Name must be at least 3 characters' }),
  email: z
    .string()
    .email({ message: 'Product Name must be at least 3 characters' }),
  contactno: z.coerce.number()
})

export type ProfileFormValues = z.infer<typeof profileSchema>
