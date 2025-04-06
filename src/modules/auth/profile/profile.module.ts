import { Module } from '@nestjs/common'
import { ProfileService } from './profile.service'
import { ProfileController } from './profile.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { AvatarModel, UserModel } from '../../../core/models'

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [SequelizeModule.forFeature([AvatarModel, UserModel])],
})
export class ProfileModule {}
