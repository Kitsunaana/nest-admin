import { Module } from '@nestjs/common'
import { TelegramService } from './telegram.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { TokenModel, UserModel } from '../../../core/models'
import { TelegrafModule } from 'nestjs-telegraf'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getTelegrafConfig } from '../../../core/configs/get-telegraf.config'

@Module({
  providers: [TelegramService],
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTelegrafConfig,
    }),
    SequelizeModule.forFeature([UserModel, TokenModel]),
  ],
})
export class TelegramModule {}
