import { jwt } from './jwt.util'
import { TokenModel, TokenType } from '../../core/models'
import { generateToken } from './generate-token.util'

// export const REFRESH_TOKEN_EXPIRY = 30 * 24 * 60 * 60 * 1000
export const REFRESH_TOKEN_EXPIRY = 20 * 1000
export const ACCESS_TOKEN_EXPIRY = 10

export const createTokens = async (
  tokenModel: typeof TokenModel,
  userId: string,
) => {
  const accessToken = jwt.createAccessToken({ userId }, ACCESS_TOKEN_EXPIRY)

  const generatedToken = await generateToken({
    userId,
    tokenModel,
    isUUID: true,
    type: TokenType.REFRESH_TOKEN,
    timeOfLife: REFRESH_TOKEN_EXPIRY,
  })

  return {
    accessToken,
    refreshToken: generatedToken.token,
  }
}
