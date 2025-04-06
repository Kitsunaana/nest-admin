import { z } from 'zod'

export const changeProfileInfoInputSchema = z.object({
  username: z.string().regex(/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/),
  displayName: z.string(),
  bio: z.string().max(512),
})

export type ChangeProfileInfoInput = z.infer<
  typeof changeProfileInfoInputSchema
>
