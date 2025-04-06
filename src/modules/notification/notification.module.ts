import { Module } from '@nestjs/common'
import { NotificationService } from './notification.service'
import { NotificationController } from './notification.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import {
  NotificationModel,
  NotificationSettingsModel,
  TokenModel,
  UserModel,
} from '../../core/models'

@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
  imports: [
    SequelizeModule.forFeature([
      UserModel,
      TokenModel,
      NotificationModel,
      NotificationSettingsModel,
    ]),
  ],
})
export class NotificationModule {}
