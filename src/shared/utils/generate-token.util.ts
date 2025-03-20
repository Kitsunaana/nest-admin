import { v4 as uuid4 } from 'uuid'
import { TokenModel, type TokenType, UserModel } from '../../core/models'

export const generateToken = async ({
  tokenModel,
  user,
  type,
  isUUID = true,
}: {
  tokenModel: typeof TokenModel
  user: UserModel
  type: TokenType
  isUUID?: boolean
}) => {
  let token: string = ''

  if (isUUID) {
    token = uuid4()
  } else {
    token = Math.floor(Math.random() * (1000000 - 100000) + 100000).toString()
  }

  const expiresIn = new Date(new Date().getTime() + 300000)

  const existingToken = await tokenModel.findOne({
    where: {
      userId: user.id,
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
    userId: user.id,
    expiresIn,
    token,
    type,
  })

  return await tokenModel.findOne({
    include: [UserModel],
    where: {
      id: newToken.id,
    },
  })
}
