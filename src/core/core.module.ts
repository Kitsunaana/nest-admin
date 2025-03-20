import { Module } from '@nestjs/common'
import {ConfigModule, ConfigService} from '@nestjs/config'
import {IS_DEV_ENV} from "../shared/utils";
import {RedisModule} from "./redis/redis.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {getSequelizeConfig} from "./configs/get-sequelize.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getSequelizeConfig,
    }),
    RedisModule,
  ],
})
export class CoreModule {}
