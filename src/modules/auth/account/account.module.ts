import { Module } from '@nestjs/common'
import { AccountService } from './account.service'
import { AccountController } from './account.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { TokenModel, UserModel } from '../../../core/models'
import { VerificationService } from '../verification/verification.service'
import { VerificationModule } from '../verification/verification.module'

@Module({
  providers: [AccountService],
  controllers: [AccountController],
  imports: [VerificationModule, SequelizeModule.forFeature([UserModel])],
})
export class AccountModule {}
