import { TelegrafModuleOptions } from 'nestjs-telegraf'
import { ConfigService } from '@nestjs/config'

export const getTelegrafConfig = (
  configService: ConfigService,
): TelegrafModuleOptions => ({
  token: configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN'),
})
