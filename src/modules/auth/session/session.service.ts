import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { RedisService } from '../../../core/redis/redis.service'
import { ConfigService } from '@nestjs/config'
import { VerificationService } from '../verification/verification.service'
import { Request, Response } from 'express'
import { LoginInput } from './input/login-input'
import { InjectModel } from '@nestjs/sequelize'
import { TokenModel, TokenType, UserModel } from '../../../core/models'
import { Op } from 'sequelize'
import { verify } from 'argon2'
import {
  destroySession,
  getSessionMetadata,
  saveSession,
} from '../../../shared/utils'
import {
  createTokens,
  REFRESH_TOKEN_EXPIRY,
} from '../../../shared/utils/create-tokens'
import { TOTP } from 'otpauth'

@Injectable()
export class SessionService {
  public constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    @InjectModel(TokenModel) private readonly tokenModel: typeof TokenModel,

    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
    private readonly verificationService: VerificationService,
  ) {}

  public async findByUser(request: Request) {
    const userId = request.session.userId

    if (!userId) throw new NotFoundException('userNotFoundInSession')

    const keys = await this.redisService.keys('*')
    const userSessions = []

    for (const key of keys) {
      const sessionData = await this.redisService.get(key)

      if (sessionData) {
        const session = JSON.parse(sessionData)

        if (session.userId === userId) {
          userSessions.push({ ...session, id: key.split(':')[1] })
        }
      }
    }

    userSessions.sort((a, b) => a.createdAt - b.createdAt)

    return userSessions.filter((session) => session.id !== request.session.id)
  }

  public async findCurrent(request: Request) {
    const sessionId = request.session.id

    const readSessionFolder =
      this.configService.getOrThrow<string>('SESSION_FOLDER')

    const sessionData = await this.redisService.get(
      `${readSessionFolder}${sessionId}`,
    )

    const session = JSON.parse(sessionData)

    return {
      ...session,
      id: sessionId,
    }
  }

  public async login(
    request: Request,
    response: Response,
    input: LoginInput,
    userAgent: string,
  ) {
    const { login, password, pin } = input

    const user = await this.userModel.findOne({
      where: {
        [Op.or]: [{ username: login }, { email: login }],
      },
    })

    if (!user) throw new NotFoundException('userNotFound')

    const isValidPassword = await verify(user.password, password)

    if (!isValidPassword)
      throw new UnauthorizedException('loginOrPasswordIncorrect')

    if (!user.isEmailVerified)
      throw new BadRequestException('accountIsNotConfirmed')

    if (user.isTotpEnabled) {
      if (!pin) {
        throw new BadRequestException('pinRequired')
      }

      const totp = new TOTP({
        issuer: 'Kitsunaana',
        label: user.email,
        algorithm: 'SHA1',
        digits: 6,
        secret: user.totpSecret,
      })

      const delta = totp.validate({ token: pin })

      if (delta === null) {
        throw new BadRequestException('incorrectPin')
      }
    }

    const metadata = getSessionMetadata(request, userAgent)

    const { refreshToken, accessToken } = await createTokens(
      this.tokenModel,
      user.id,
    )

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      expires: new Date(Date.now() + REFRESH_TOKEN_EXPIRY),
    })

    await saveSession(request, user, metadata)

    response.json({
      accessToken,
    })
  }

  public async refreshToken(request: Request, response: Response) {
    const { refreshToken } = request.cookies

    if (!refreshToken) throw new UnauthorizedException('refreshTokenInvalid')

    const storedToken = await this.tokenModel.findOne({
      where: {
        type: TokenType.REFRESH_TOKEN,
        token: refreshToken,
      },
    })

    const createdTokens = await createTokens(
      this.tokenModel,
      storedToken.userId,
    )

    response.cookie('refreshToken', createdTokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      expires: new Date(Date.now() + REFRESH_TOKEN_EXPIRY),
    })

    response.json({
      accessToken: createdTokens.accessToken,
    })
  }

  public async logout(request: Request) {
    request.res.clearCookie('refreshToken')

    return destroySession(request, this.configService)
  }

  public async clearSession(request: Request) {
    request.res.clearCookie(
      this.configService.getOrThrow<string>('SESSION_NAME'),
    )

    return true
  }

  public async remove(request: Request, id: string) {
    if (request.session.id === id)
      throw new ConflictException('currentSessionCantRemove')

    const readSessionFolder =
      this.configService.getOrThrow<string>('SESSION_FOLDER')

    await this.redisService.del(`${readSessionFolder}${id}`)

    return true
  }
}
