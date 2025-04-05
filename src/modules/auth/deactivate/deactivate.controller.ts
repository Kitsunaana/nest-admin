import { Body, Controller, Post, Req } from '@nestjs/common'
import { DeactivateService } from './deactivate.service'
import {
  Authorization,
  Authorized,
  UserAgent,
} from '../../../shared/decorators'
import { Request } from 'express'
import {
  DeactivateAccountInput,
  deactivateAccountInputSchema,
} from './inputs/deactivate-account.input'
import { UserModel } from '../../../core/models'
import { ZodValidationPipe } from '../../../shared/pipes'

@Controller('deactivate')
export class DeactivateController {
  constructor(private readonly deactivateService: DeactivateService) {}

  @Authorization()
  @Post()
  public async deactivate(
    @Req() request: Request,
    @Body(new ZodValidationPipe(deactivateAccountInputSchema))
    input: DeactivateAccountInput,
    @Authorized() user: UserModel,
    @UserAgent() userAgent: string,
  ) {
    return this.deactivateService.deactivate(request, input, user, userAgent)
  }
}
