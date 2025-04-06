import { Global, Module } from '@nestjs/common'
import { TelegramService } from './telegram.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { TokenModel, UserModel } from '../../../core/models'
import { TelegrafModule } from 'nestjs-telegraf'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getTelegrafConfig } from '../../../core/configs/get-telegraf.config'

@Global()
@Module({
  exports: [TelegramService],
  providers: [TelegramService],
  imports: [
    SequelizeModule.forFeature([UserModel, TokenModel]),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTelegrafConfig,
    }),
  ],
})
export class TelegramModule {}
