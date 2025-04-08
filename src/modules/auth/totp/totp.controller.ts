import { Body, Controller, Post } from '@nestjs/common'
import { TotpService } from './totp.service'
import { Authorization, Authorized } from '../../../shared/decorators'
import { UserModel } from '../../../core/models'
import { EnableTotpInput } from './input/enable-totp.input'

@Controller('totp')
export class TotpController {
  public constructor(private readonly totpService: TotpService) {}

  @Authorization()
  @Post('/generate-secret')
  public async generate(@Authorized() user: UserModel) {
    return this.totpService.generate(user)
  }

  @Authorization()
  @Post('/enable')
  public async enable(
    @Authorized() user: UserModel,
    @Body() input: EnableTotpInput,
  ) {
    return this.totpService.enable(user, input)
  }

  @Authorization()
  @Post('/disable')
  public async disable(@Authorized() user: UserModel) {
    return this.totpService.disable(user)
  }
}
