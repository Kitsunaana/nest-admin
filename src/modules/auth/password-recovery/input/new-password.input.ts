import { z } from 'zod'

export const newPasswordInputSchema = z
  .object({
    token: z.string().uuid({ message: 'uuidIncorrect' }),

    password: z
      .string()
      .min(3, { message: 'required' })
      .min(8, { message: 'passwordLength' })
      .max(255, { message: 'passwordLength' })
      .regex(
        /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,255}/g,
        {
          message: 'passwordSimple',
        },
      ),
    repeatPassword: z.string().min(3, { message: 'required' }),
  })
  .refine((data) => data.password !== data.repeatPassword, {
    path: ['repeatPassword'],
    message: 'passwordDontMatch',
  })

export type NewPasswordInput = z.infer<typeof newPasswordInputSchema>
