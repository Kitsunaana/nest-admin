import { BadRequestException, Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common'
import { SessionService } from './session.service'
import { Authorization, UserAgent } from '../../../shared/decorators'
import { Request, Response } from 'express'
import { LoginInput } from './input/login-input'
import { Recaptcha } from '@nestlab/google-recaptcha'
import { AuthProviderGuard } from 'src/shared/guards/provider.guard'
import { ConfigService } from '@nestjs/config'
import { ProviderService } from '../provider/provider.service'
import { getSessionMetadata } from 'src/shared/utils'

@Controller('session')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly configService: ConfigService,
    private readonly providerService: ProviderService,
  ) { }

  @Authorization()
  @Get('/find-by-user')
  public async findByUser(@Req() request: Request) {
    return this.sessionService.findByUser(request)
  }

  @Authorization()
  @Get('find-current')
  public async findCurrent(@Req() request: Request) {
    return this.sessionService.findCurrent(request)
  }

  @Recaptcha()
  @Post('/login')
  public async login(
    @Res() response: Response,
    @Req() request: Request,
    @Body() input: LoginInput,
    @UserAgent() userAgent: string,
  ) {
    return this.sessionService.login(request, response, input, userAgent)
  }

  @Get("/oauth/callback/:provider")
  public async callback(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Query("code") code: string,
    @Param("provider") provider: string,
    @UserAgent() userAgent: string,
  ) {
    if (!code) {
      throw new BadRequestException("Не был предоставлен код авторизации")
    }

    const metadata = getSessionMetadata(request, userAgent)

    await this.sessionService.extractProfileFromCode(request, provider, code, metadata)

    return {
      redirectUri: this.configService.getOrThrow<string>("ALLOWED_ORIGIN")
    }
  }

  @UseGuards(AuthProviderGuard)
  @Get("/oauth/connect/:provider")
  public async connect(@Param("provider") provider: string) {
    const providerInstance = this.providerService.findByService(provider)

    return {
      url: providerInstance.getAuthUrl()
    }
  }

  @Post('/refresh')
  public async refreshToken(
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return this.sessionService.refreshToken(request, response)
  }

  @Authorization()
  @Post('/logout')
  public async logout(@Req() request: Request) {
    return this.sessionService.logout(request)
  }

  @Post('/clear')
  public async clearSession(@Req() request: Request) {
    return this.sessionService.clearSession(request)
  }

  @Authorization()
  @Post('/remove')
  public async remove(@Req() request: Request, @Body('id') id: string) {
    return this.sessionService.remove(request, id)
  }
}
