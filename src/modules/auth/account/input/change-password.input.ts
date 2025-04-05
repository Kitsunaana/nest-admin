import { z } from 'zod'

export const changePasswordInputSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8),
})

export type ChangePasswordInput = z.infer<typeof changePasswordInputSchema>
