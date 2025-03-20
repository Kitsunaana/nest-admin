import { Global, Module } from '@nestjs/common'
import { MailService } from './mail.service'
import { MailerModule } from '@nestjs-modules/mailer'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { HttpModule } from '@nestjs/axios'
import { getMailerConfig } from '../../../core/configs/mailer.config'

@Global()
@Module({
  imports: [
    HttpModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMailerConfig,
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
