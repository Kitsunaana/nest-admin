import { z } from 'zod'

export const updateAvatarsInputSchema = z.array(
  z.object({
    id: z.string(),
    path: z.string(),
    order: z.number(),
    caption: z.string(),
    originalName: z.string(),
    deleted: z.boolean().optional(),
  }),
)

export type UpdateAvatarsInput = z.infer<typeof updateAvatarsInputSchema>
