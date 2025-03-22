import { Module } from '@nestjs/common'
import { SessionService } from './session.service'
import { SessionController } from './session.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { TokenModel, UserModel } from '../../../core/models'
import { VerificationModule } from '../verification/verification.module'

@Module({
  controllers: [SessionController],
  providers: [SessionService],
  imports: [
    VerificationModule,
    SequelizeModule.forFeature([UserModel, TokenModel]),
  ],
})
export class SessionModule {}
