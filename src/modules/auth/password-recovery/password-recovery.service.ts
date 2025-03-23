import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { MailService } from '../../libs/mail/mail.service'
import { ResetPasswordInput } from './input/reset-password.input'
import { InjectModel } from '@nestjs/sequelize'
import { TokenModel, TokenType, UserModel } from '../../../core/models'
import { generateToken, getSessionMetadata } from '../../../shared/utils'
import { Request } from 'express'
import { NewPasswordInput } from './input/new-password.input'
import { hash } from 'argon2'

@Injectable()
export class PasswordRecoveryService {
  public constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    @InjectModel(TokenModel) private readonly tokenModel: typeof TokenModel,

    private readonly mailService: MailService,
  ) {}

  public async resetPassword(
    request: Request,
    input: ResetPasswordInput,
    userAgent: string,
  ) {
    const { email } = input

    const user = await this.userModel.findOne({
      where: {
        email,
      },
    })

    if (!user) throw new NotFoundException('userNotFound')

    const resetToken = await generateToken({
      type: TokenType.PASSWORD_RESET,
      tokenModel: this.tokenModel,
      userId: user.id,
      isUUID: true,
    })

    const metadata = getSessionMetadata(request, userAgent)

    await this.mailService.sendPasswordResetToken(
      user.email,
      resetToken.token,
      metadata,
    )

    return true
  }

  public async newPassword(input: NewPasswordInput) {
    const { password, token } = input

    const existingToken = await this.tokenModel.findOne({
      where: {
        token,
        type: TokenType.PASSWORD_RESET,
      },
    })

    if (!existingToken) throw new NotFoundException('tokenNotFound')

    const hasExpired = new Date(existingToken.expiresIn) < new Date()

    if (hasExpired) throw new BadRequestException('tokenHasExpired')

    await this.userModel.update(
      {
        password: await hash(password),
      },
      {
        where: {
          id: existingToken.userId,
        },
      },
    )

    return true
  }
}
