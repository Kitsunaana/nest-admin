import { ConfigService } from '@nestjs/config'
import type { MailerOptions } from '@nestjs-modules/mailer'

export const getMailerConfig = (
  configService: ConfigService,
): MailerOptions => {
  const login = configService.getOrThrow<string>('MAIL_LOGIN')

  return {
    transport: {
      secure: false,
      host: configService.getOrThrow<string>('MAIL_HOST'),
      port: Number(configService.getOrThrow<string>('MAIL_PORT')),
      auth: {
        pass: configService.getOrThrow<string>('MAIL_PASSWORD'),
        user: login,
      },
    },
    defaults: {
      from: `"Fullstack" ${login}`,
    },
  }
}
