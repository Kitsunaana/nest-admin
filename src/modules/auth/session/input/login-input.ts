import { z } from 'zod'

export const loginInputSchema = z.object({
  pin: z.string().length(6).optional(),
  login: z.string(),
  password: z.string().min(8).max(255),
})

export type LoginInput = z.infer<typeof loginInputSchema>
