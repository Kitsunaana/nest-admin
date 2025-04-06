import { v4 as uuid4 } from 'uuid'
import {
  NotificationSettingsModel,
  TokenModel,
  type TokenType,
  UserModel,
} from '../../core/models'

export const generateToken = async ({
  tokenModel,
  userId,
  type,
  timeOfLife = 300_000,
  isUUID = true,
}: {
  tokenModel: typeof TokenModel
  userId: string
  type: TokenType
  timeOfLife?: number
  isUUID?: boolean
}) => {
  let token: string = ''

  if (isUUID) {
    token = uuid4()
  } else {
    token = Math.floor(Math.random() * (1000000 - 100000) + 100000).toString()
  }

  const expiresIn = new Date(new Date().getTime() + timeOfLife)

  const existingToken = await tokenModel.findOne({
    where: {
      userId,
      type,
    },
  })

  if (existingToken) {
    await tokenModel.destroy({
      where: {
        id: existingToken.id,
      },
    })
  }

  const newToken = await tokenModel.create({
    id: uuid4(),
    userId,
    expiresIn,
    token,
    type,
  })

  return await tokenModel.findOne({
    include: [
      {
        model: UserModel,
        include: [NotificationSettingsModel],
      },
    ],
    where: {
      id: newToken.id,
    },
  })
}
