import { Body, Controller, Get, Patch, Post } from '@nestjs/common'
import {
  CreateUserInput,
  createUserInputSchema,
} from './input/create-user.input'
import { AccountService } from './account.service'
import { ZodValidationPipe } from '../../../shared/pipes'
import { Authorization, Authorized } from '../../../shared/decorators'
import { UserModel } from '../../../core/models'
import {
  ChangeEmailInput,
  changeEmailInputSchema,
} from './input/change-email.input'
import {
  ChangePasswordInput,
  changePasswordInputSchema,
} from './input/change-password.input'

@Controller('account')
export class AccountController {
  public constructor(private readonly accountService: AccountService) {}

  @Authorization()
  @Get()
  public async me(@Authorized('id') id: string) {
    return this.accountService.me(id)
  }

  @Post('/resend-verification-token')
  async resendVerificationToken(@Body() body: { login: string }) {
    return this.accountService.resendVerificationToken(body.login)
  }

  @Post()
  async create(
    @Body(new ZodValidationPipe(createUserInputSchema)) input: CreateUserInput,
  ) {
    return this.accountService.create(input)
  }

  @Authorization()
  @Patch('/change-email')
  public async changeEmail(
    @Authorized() user: UserModel,
    @Body(new ZodValidationPipe(changeEmailInputSchema))
    input: ChangeEmailInput,
  ) {
    return this.accountService.changeEmail(user, input)
  }

  @Authorization()
  @Patch('/change-password')
  public async changePassword(
    @Authorized() user: UserModel,
    @Body(new ZodValidationPipe(changePasswordInputSchema))
    input: ChangePasswordInput,
  ) {
    return this.accountService.changePassword(user, input)
  }
}
