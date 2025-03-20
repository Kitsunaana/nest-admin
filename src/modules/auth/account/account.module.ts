import { Module } from '@nestjs/common'
import { AccountService } from './account.service'
import { AccountController } from './account.controller'
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "../../../core/models";

@Module({
  providers: [AccountController, AccountService],
  controllers: [AccountController],
  imports: [
    SequelizeModule.forFeature([
      UserModel
    ])
  ]
})
export class AccountModule {}
