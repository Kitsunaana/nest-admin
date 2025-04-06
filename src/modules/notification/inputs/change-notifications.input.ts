import { z } from 'zod'

export const changeNotificationsSettingsInputSchema = z.object({
  siteNotifications: z.boolean(),
  telegramNotifications: z.boolean(),
})

export type ChangeNotificationsSettingsInput = z.infer<
  typeof changeNotificationsSettingsInputSchema
>
