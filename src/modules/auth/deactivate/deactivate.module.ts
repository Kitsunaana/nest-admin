import { Module } from '@nestjs/common'
import { DeactivateService } from './deactivate.service'
import { DeactivateController } from './deactivate.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { TokenModel, UserModel } from '../../../core/models'

@Module({
  controllers: [DeactivateController],
  providers: [DeactivateService],
  imports: [SequelizeModule.forFeature([UserModel, TokenModel])],
})
export class DeactivateModule {}
