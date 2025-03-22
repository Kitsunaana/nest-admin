import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { SessionService } from './session.service'
import { Authorization, UserAgent } from '../../../shared/decorators'
import { Request } from 'express'
import { LoginInput } from './input/login-input'

@Controller('session')
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}

  @Authorization()
  @Get()
  public async findByUser(@Req() request: Request) {
    return this.sessionService.findByUser(request)
  }

  @Authorization()
  @Get()
  public async findCurrent(@Req() request: Request) {
    return this.sessionService.findCurrent(request)
  }

  @Post('/login')
  public async login(
    @Req() request: Request,
    @Body() input: LoginInput,
    @UserAgent() userAgent: string,
  ) {
    return this.sessionService.login(request, input, userAgent)
  }

  @Authorization()
  @Post('/logout')
  public async logout(@Req() request: Request) {
    return this.sessionService.logout(request)
  }

  @Post('/clear-session')
  public async clearSession(@Req() request: Request) {
    return this.sessionService.clearSession(request)
  }

  @Authorization()
  @Post('/remove-session')
  public async remove(@Req() request: Request, @Body('id') id: string) {
    return this.sessionService.remove(request, id)
  }
}
