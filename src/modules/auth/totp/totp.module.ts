import { Module } from '@nestjs/common'
import { TotpService } from './totp.service'
import { TotpController } from './totp.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserModel } from '../../../core/models'

@Module({
  controllers: [TotpController],
  providers: [TotpService],
  imports: [SequelizeModule.forFeature([UserModel])],
})
export class TotpModule {}
