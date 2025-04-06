import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { hash, verify } from 'argon2'
import { UserModel } from '../../../core/models'
import { CreateUserInput } from './input/create-user.input'
import { InjectModel } from '@nestjs/sequelize'
import { VerificationService } from '../verification/verification.service'
import { Op } from 'sequelize'
import { ChangeEmailInput } from './input/change-email.input'
import { ChangePasswordInput } from './input/change-password.input'

@Injectable()
export class AccountService {
  public constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    private readonly verificationService: VerificationService,
  ) {}

  public async me(id: string) {
    return this.userModel.findOne({
      attributes: {
        exclude: [
          'password',
          'telegramId',
          'isTotpEnabled',
          'isDeactivated',
          'totpSecret',
          'createdAt',
          'updatedAt',
        ],
      },
      where: {
        id,
      },
    })
  }

  public async resendVerificationToken(login: string) {
    const user = await this.userModel.findOne({
      where: {
        [Op.or]: [{ username: login }, { email: login }],
      },
    })

    if (!user) throw new NotFoundException('userWithEmailNotFound')

    if (user.isEmailVerified)
      throw new ConflictException('emailHasAlreadyConfirmed')

    await this.verificationService.sendVerificationToken(user)

    return true
  }

  public async create(input: CreateUserInput) {
    const { username, email, password } = input

    const isUsernameExists = await this.userModel.findOne({
      where: {
        username,
      },
    })

    if (isUsernameExists) throw new ConflictException('usernameExists')

    const isEmailExists = await this.userModel.findOne({
      where: {
        email,
      },
    })

    if (isEmailExists) throw new ConflictException('emailExists')

    const user = await this.userModel.create({
      email,
      username,
      displayName: username,
      password: await hash(password),
    })

    await this.verificationService.sendVerificationToken(user)

    return true
  }

  public async changeEmail(user: UserModel, input: ChangeEmailInput) {
    const { email } = input

    await this.userModel.update(
      {
        email,
      },
      {
        where: {
          id: user.id,
        },
      },
    )

    return true
  }

  public async changePassword(user: UserModel, input: ChangePasswordInput) {
    const { newPassword, currentPassword } = input

    const isValidPassword = await verify(user.password, currentPassword)

    if (!isValidPassword)
      throw new UnauthorizedException('incorrectCurrentPassword')

    await this.userModel.update(
      {
        password: await hash(newPassword),
      },
      {
        where: {
          id: user.id,
        },
      },
    )
  }
}
