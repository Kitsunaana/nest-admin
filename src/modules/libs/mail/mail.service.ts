import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'
import { render } from '@react-email/components'
import { HttpService } from '@nestjs/axios'
import { VerificationTemplate } from './templates/verification.template'

@Injectable()
export class MailService {
  public constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  public async sendVerificationToken(email: string, token: string) {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
    const html = await render(VerificationTemplate({ domain, token }))

    return this.sendMail(email, 'Верификация аккаунта', html)
  }

  private async sendMail(email: string, subject: string, html: string) {
    const formData = new FormData()

    formData.append('name', 'Kitsunaana')
    formData.append('from', 'info@kitsunaana.store')
    formData.append('subject', subject)
    formData.append('to', email)
    formData.append('html', html)

    return this.httpService.axiosRef.post(
      'https://api.smtp.bz/v1/smtp/send',
      formData,
      {
        headers: {
          Authorization: this.configService.getOrThrow<string>('MAIL_TOKEN'),
          'Content-Type': 'multipart/form-data',
        },
      },
    )
  }
}
