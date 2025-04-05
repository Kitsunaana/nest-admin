import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MailService } from '../../libs/mail/mail.service'
import { DeactivateAccountInput } from './inputs/deactivate-account.input'
import { TokenModel, TokenType, UserModel } from '../../../core/models'
import { verify } from 'argon2'
import { InjectModel } from '@nestjs/sequelize'
import {
  destroySession,
  generateToken,
  getSessionMetadata,
} from '../../../shared/utils'
import { Request } from 'express'

@Injectable()
export class DeactivateService {
  public constructor(
    private readonly configService: ConfigService,
    private readonly mailService: MailService,

    @InjectModel(TokenModel) private readonly tokenModel: typeof TokenModel,
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
  ) {}

  public async deactivate(
    request: Request,
    input: DeactivateAccountInput,
    user: UserModel,
    userAgent: string,
  ) {
    const { pin, email, password } = input

    if (user.email !== email)
      throw new BadRequestException('loginOrPasswordIncorrect')

    const isValidPassword = await verify(user.password, password)

    if (!isValidPassword)
      throw new BadRequestException('loginOrPasswordIncorrect')

    if (!pin) {
      await this.sendDeactivateToken(request, user, userAgent)

      return {
        message: 'pinRequired',
      }
    }

    await this.validateDeactivateToken(request, pin)

    return {
      message: 'pinUpdateSuccess',
    }
  }

  private async validateDeactivateToken(request: Request, token: string) {
    const existingToken = await this.tokenModel.findOne({
      where: {
        token,
        type: TokenType.DEACTIVATE_ACCOUNT,
      },
    })

    if (!existingToken) throw new NotFoundException('Токен не найден')

    const hasExpired = new Date(existingToken.expiresIn) < new Date()

    if (hasExpired) throw new BadRequestException('Токен истек')

    await this.userModel.update(
      {
        isDeactivated: true,
        deactivatedAt: new Date(),
      },
      {
        where: {
          id: existingToken.userId,
        },
      },
    )

    await this.tokenModel.destroy({
      where: {
        id: existingToken.id,
        type: TokenType.DEACTIVATE_ACCOUNT,
      },
    })

    return destroySession(request, this.configService)
  }

  public async sendDeactivateToken(
    request: Request,
    user: UserModel,
    userAgent: string,
  ) {
    const deactivateToken = await generateToken({
      type: TokenType.DEACTIVATE_ACCOUNT,
      tokenModel: this.tokenModel,
      userId: user.id,
      isUUID: false,
    })

    const metadata = getSessionMetadata(request, userAgent)

    await this.mailService.sendDeactivateToken(
      user.email,
      deactivateToken.token,
      metadata,
    )

    return true
  }
}
