import { Body, Controller, Post, Req } from '@nestjs/common'
import { PasswordRecoveryService } from './password-recovery.service'
import { NewPasswordInput } from './input/new-password.input'
import { UserAgent } from '../../../shared/decorators'
import { ResetPasswordInput } from './input/reset-password.input'
import { Request } from 'express'

@Controller('password-recovery')
export class PasswordRecoveryController {
  constructor(
    private readonly passwordRecoveryService: PasswordRecoveryService,
  ) {}

  @Post('/reset')
  public async resetPassword(
    @Req() request: Request,
    @Body() input: ResetPasswordInput,
    @UserAgent() agent: string,
  ) {
    return this.passwordRecoveryService.resetPassword(request, input, agent)
  }

  @Post('/new')
  public async newPassword(@Body() input: NewPasswordInput) {
    return this.passwordRecoveryService.newPassword(input)
  }
}
