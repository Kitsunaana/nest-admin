import { VerificationService } from './verification.service'
import { Body, Controller, Post, Req } from '@nestjs/common'
import { VerificationInput } from './inputs/verification.input'
import { UserAgent } from '../../../shared/decorators'
import { Request } from 'express'

@Controller('verification')
export class VerificationController {
  public constructor(
    private readonly verificationService: VerificationService,
  ) {}

  @Post()
  public async verify(
    @Req() request: Request,
    @Body() input: VerificationInput,
    @UserAgent() userAgent: string,
  ) {
    return this.verificationService.verify(request, input, userAgent)
  }
}
