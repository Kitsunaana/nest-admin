import { Module } from '@nestjs/common'
import { CronService } from './cron.service'
import { ScheduleModule } from '@nestjs/schedule'
import { SequelizeModule } from '@nestjs/sequelize'
import { AvatarModel, UserModel } from '../../core/models'

@Module({
  providers: [CronService],
  imports: [
    ScheduleModule.forRoot(),
    SequelizeModule.forFeature([UserModel, AvatarModel]),
  ],
})
export class CronModule {}
