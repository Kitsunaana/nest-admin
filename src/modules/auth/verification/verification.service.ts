import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { MailService } from '../../libs/mail/mail.service'
import { VerificationInput } from './inputs/verification.input'
import { InjectModel } from '@nestjs/sequelize'
import { TokenModel, TokenType, UserModel } from '../../../core/models'
import {
  generateToken,
  getSessionMetadata,
  saveSession,
} from '../../../shared/utils'
import {
  createTokens,
  REFRESH_TOKEN_EXPIRY,
} from '../../../shared/utils/create-tokens'

@Injectable()
export class VerificationService {
  public constructor(
    private readonly mailService: MailService,

    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    @InjectModel(TokenModel) private readonly tokenModel: typeof TokenModel,
  ) {}

  public async verify(
    request: Request,
    response: Response,
    input: VerificationInput,
    userAgent: string,
  ) {
    const { token } = input

    const existingToken = await this.tokenModel.findOne({
      include: [UserModel],
      where: {
        token,
        type: TokenType.EMAIL_VERIFY,
      },
    })

    if (!existingToken) throw new NotFoundException('tokenNotFound')

    const hasExpired = new Date(existingToken.expiresIn) < new Date()

    if (hasExpired) {
      await this.sendVerificationToken(existingToken.user)

      throw new BadRequestException('tokenHasExpired')
    }

    await this.userModel.update(
      {
        isEmailVerified: true,
      },
      {
        where: {
          id: existingToken.userId,
        },
      },
    )

    const user = await this.userModel.findOne({
      where: {
        id: existingToken.userId,
      },
    })

    await this.tokenModel.destroy({
      where: {
        id: existingToken.id,
        type: TokenType.EMAIL_VERIFY,
      },
    })

    const metadata = getSessionMetadata(request, userAgent)

    await saveSession(request, user, metadata)

    const tokens = await createTokens(this.tokenModel, user.id)

    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      expires: new Date(Date.now() + REFRESH_TOKEN_EXPIRY),
    })

    return response.json({
      accessToken: tokens.accessToken,
    })
  }

  public async sendVerificationToken(user: UserModel) {
    const verificationToken = await generateToken({
      tokenModel: this.tokenModel,
      type: TokenType.EMAIL_VERIFY,
      isUUID: true,
      userId: user.id,
    })

    await this.mailService.sendVerificationToken(
      user.email,
      verificationToken.token,
    )

    return true
  }
}
