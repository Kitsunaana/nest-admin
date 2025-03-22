import { jwt } from './jwt.util'
import { TokenModel, TokenType } from '../../core/models'
import { v4 as uuidv4 } from 'uuid'

const REFRESH_TOKEN_EXPIRY = 20 * 1000

const ACCESS_TOKEN_EXPIRY = 10

export const createTokens = async (
  tokenModel: typeof TokenModel,
  userId: string,
) => {
  const accessToken = jwt.createAccessToken({ userId }, ACCESS_TOKEN_EXPIRY)
  const refreshToken = jwt.createRefreshToken()

  await tokenModel.create({
    userId,
    id: uuidv4(),
    token: refreshToken,
    expiresIn: new Date(Date.now() + REFRESH_TOKEN_EXPIRY),
    type: TokenType.REFRESH_TOKEN,
  })

  return {
    accessToken,
    refreshToken,
  }
}
