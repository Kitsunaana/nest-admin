import { VerificationService } from './verification.service'
import { Body, Controller, Post, Req, Res } from '@nestjs/common'
import { VerificationInput } from './inputs/verification.input'
import { UserAgent } from '../../../shared/decorators'
import { Request, Response } from 'express'

@Controller('verification')
export class VerificationController {
  public constructor(
    private readonly verificationService: VerificationService,
  ) {}

  @Post()
  public async verify(
    @Req() request: Request,
    @Res() response: Response,
    @Body() input: VerificationInput,
    @UserAgent() userAgent: string,
  ) {
    return this.verificationService.verify(request, response, input, userAgent)
  }
}
