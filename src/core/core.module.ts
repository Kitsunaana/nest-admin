import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import {IS_DEV_ENV} from "../shared/utils";
import {RedisModule} from "./redis/redis.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
    }),
    RedisModule,
  ],
})
export class CoreModule {}
