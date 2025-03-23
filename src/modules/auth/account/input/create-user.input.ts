import { z } from 'zod'

const requiredField = z
  .string({ message: 'required' })
  .min(3, { message: 'required' })

const passwordField = requiredField
  .min(8, { message: 'passwordLength' })
  .max(255, { message: 'passwordLength' })

export const createUserInputSchema = z.object({
  username: requiredField
    .max(255, { message: 'nameLength' })
    .regex(/^[0-9a-zA-Zа-яА-ЯёЁ~.,;:!@#$%^&*()_+=`'"№?{}[\]<>-]+$/, {
      message: 'invalid',
    }),

  email: requiredField
    // eslint-disable-next-line max-len
    .regex(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      {
        message: 'emailInvalid',
      },
    )
    .max(255, { message: 'emailLength' }),

  password: passwordField.regex(
    /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,255}/g,
    {
      message: 'passwordSimple',
    },
  ),
})

export type CreateUserInput = z.infer<typeof createUserInputSchema>
