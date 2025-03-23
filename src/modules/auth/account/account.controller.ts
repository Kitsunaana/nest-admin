import { Body, Controller, Get, Post } from '@nestjs/common'
import {
  CreateUserInput,
  createUserInputSchema,
} from './input/create-user.input'
import { AccountService } from './account.service'
import { ZodValidationPipe } from '../../../shared/pipes'
import { Authorization, Authorized } from '../../../shared/decorators'

@Controller('account')
export class AccountController {
  public constructor(private readonly accountService: AccountService) {}

  @Authorization()
  @Get()
  public async me(@Authorized('id') id: string) {
    return this.accountService.me(id)
  }

  @Post('/resend-verification-token')
  async resendVerificationToken(@Body() body: { data: string }) {
    return this.accountService.resendVerificationToken(body.data)
  }

  @Post()
  async create(
    @Body(new ZodValidationPipe(createUserInputSchema)) input: CreateUserInput,
  ) {
    return this.accountService.create(input)
  }
}
