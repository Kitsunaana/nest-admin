import { Module } from '@nestjs/common'
import { PasswordRecoveryService } from './password-recovery.service'
import { PasswordRecoveryController } from './password-recovery.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { TokenModel, UserModel } from '../../../core/models'

@Module({
  controllers: [PasswordRecoveryController],
  providers: [PasswordRecoveryService],
  imports: [SequelizeModule.forFeature([UserModel, TokenModel])],
})
export class PasswordRecoveryModule {}
