import { z } from 'zod'

export const changeEmailInputSchema = z.object({
  email: z.string().email(),
})

export type ChangeEmailInput = z.infer<typeof changeEmailInputSchema>
