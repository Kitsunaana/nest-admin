import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { IS_DEV_ENV } from '../shared/utils'
import { RedisModule } from './redis/redis.module'
import { SequelizeModule } from '@nestjs/sequelize'
import { getSequelizeConfig } from './configs/get-sequelize.config'
import { AccountModule } from '../modules/auth/account/account.module'
import { VerificationModule } from '../modules/auth/verification/verification.module'
import { MailModule } from '../modules/libs/mail/mail.module'
import { LocalesModule } from '../modules/libs/locales/locales.module'
import { SessionModule } from '../modules/auth/session/session.module'
import { PasswordRecoveryModule } from '../modules/auth/password-recovery/password-recovery.module'
import { TotpModule } from '../modules/auth/totp/totp.module'
import { DeactivateModule } from '../modules/auth/deactivate/deactivate.module'
import { CronModule } from '../modules/cron/cron.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getSequelizeConfig,
    }),
    MailModule,
    RedisModule,
    VerificationModule,
    AccountModule,
    LocalesModule,
    SessionModule,
    PasswordRecoveryModule,
    TotpModule,
    DeactivateModule,
    CronModule,
  ],
})
export class CoreModule {}
