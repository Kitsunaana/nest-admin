import { z } from 'zod'

export const verificationInputSchema = z.object({
  token: z.string().uuid(),
})

export type VerificationInput = z.infer<typeof verificationInputSchema>
