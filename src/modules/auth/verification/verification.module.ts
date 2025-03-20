import { Module } from '@nestjs/common'
import { VerificationService } from './verification.service'
import { VerificationController } from './verification.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { TokenModel, UserModel } from '../../../core/models'

@Module({
  providers: [VerificationService],
  controllers: [VerificationController],
  imports: [SequelizeModule.forFeature([UserModel, TokenModel])],
  exports: [VerificationService],
})
export class VerificationModule {}
