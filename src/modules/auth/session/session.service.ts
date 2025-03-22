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
import { Request } from 'express'
import { LoginInput } from './input/login-input'
import { InjectModel } from '@nestjs/sequelize'
import { UserModel } from '../../../core/models'
import { Op } from 'sequelize'
import { verify } from 'argon2'
import {
  destroySession,
  getSessionMetadata,
  saveSession,
} from '../../../shared/utils'

@Injectable()
export class SessionService {
  public constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,

    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
    private readonly verificationService: VerificationService,
  ) {}

  public async findByUser(request: Request) {
    const userId = request.session.userId

    if (!userId)
      throw new NotFoundException('Пользователь не обнаружен в сессии')

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

  public async login(request: Request, input: LoginInput, userAgent: string) {
    const { login, password } = input

    const user = await this.userModel.findOne({
      where: {
        [Op.or]: [
          {
            username: login,
          },
          {
            email: login,
          },
        ],
      },
    })

    if (!user) throw new NotFoundException('Пользователь не найден')

    const isValidPassword = await verify(user.password, password)

    if (!isValidPassword) throw new UnauthorizedException('Неверный пароль')

    if (!user.isEmailVerified) {
      await this.verificationService.sendVerificationToken(user)

      throw new BadRequestException(
        'Аккаунт не верефицирован. Пожалуйста, провертье свою почту для подтверждения',
      )
    }

    const metadata = getSessionMetadata(request, userAgent)

    return saveSession(request, user, metadata)
  }

  public async logout(request: Request) {
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
      throw new ConflictException('Текущую сессию удалить нельзя')

    const readSessionFolder =
      this.configService.getOrThrow<string>('SESSION_FOLDER')

    await this.redisService.del(`${readSessionFolder}${id}`)

    return true
  }
}
