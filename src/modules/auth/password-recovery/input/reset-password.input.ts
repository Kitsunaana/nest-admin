import { z } from 'zod'

export const resetPasswordInputSchema = z.object({
  email: z.string().email(),
})

export type ResetPasswordInput = z.infer<typeof resetPasswordInputSchema>
