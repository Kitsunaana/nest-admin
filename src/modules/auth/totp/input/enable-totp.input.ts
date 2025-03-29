import { z } from 'zod'

export const enableTotpInputSchema = z.object({
  secret: z.string(),
  pin: z.string().length(6),
})

export type EnableTotpInput = z.infer<typeof enableTotpInputSchema>
