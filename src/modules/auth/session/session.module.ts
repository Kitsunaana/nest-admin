import { Module } from '@nestjs/common'
import { SessionService } from './session.service'
import { SessionController } from './session.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { TokenModel, UserModel } from '../../../core/models'
import { VerificationModule } from '../verification/verification.module'
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha'
import { getRecaptchaConfig } from 'src/core/configs/recaptcha.config'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ProviderModule } from '../provider/provider.module'
import { getProvidersConfig } from 'src/core/configs/providers.config'

@Module({
  controllers: [SessionController],
  providers: [SessionService],
  imports: [
    VerificationModule,
    SequelizeModule.forFeature([UserModel, TokenModel]),
    GoogleRecaptchaModule.forRootAsync({
      useFactory: getRecaptchaConfig,
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    ProviderModule.registerAsync({
      useFactory: getProvidersConfig,
      imports: [ConfigModule],
      inject: [ConfigService]
    })
  ],
})
export class SessionModule { }
