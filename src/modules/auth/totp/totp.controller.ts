import { Body, Controller, Get, Post } from '@nestjs/common'
import { TotpService } from './totp.service'
import { Authorization, Authorized } from '../../../shared/decorators'
import { UserModel } from '../../../core/models'
import { EnableTotpInput } from './input/enable-totp.input'

@Controller('totp')
export class TotpController {
  public constructor(private readonly totpService: TotpService) {}

  @Authorization()
  @Get('/generate-totp-secret')
  public async generate(@Authorized() user: UserModel) {
    return this.totpService.generate(user)
  }

  @Authorization()
  @Post('/enable-totp')
  public async enable(
    @Authorized() user: UserModel,
    @Body() input: EnableTotpInput,
  ) {
    return this.totpService.enable(user, input)
  }

  @Authorization()
  @Post('/disable-totp')
  public async disable(@Authorized() user: UserModel) {
    return this.totpService.disable(user)
  }
}
