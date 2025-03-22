import { z } from 'zod'

export const loginInputSchema = z.object({
  login: z.string(),
  password: z.string().min(8).max(255),
})

export type LoginInput = z.infer<typeof loginInputSchema>
