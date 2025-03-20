import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import {
  User,
  Token,
  SocialLink,
  Notification,
  NotificationSettings,
} from "../models"

export const getSequelizeConfig = (configService: ConfigService): SequelizeModuleOptions => ({
  username: configService.getOrThrow<string>('POSTGRES_USER'),
  password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
  database: configService.getOrThrow<string>('POSTGRES_DB'),
  host: configService.getOrThrow<string>('POSTGRES_HOST'),
  dialect: 'postgres',
  port: Number(configService.getOrThrow<string>('POSTGRES_PORT')),
  models: [User, Token, SocialLink, Notification, NotificationSettings],
  autoLoadModels: true,
  synchronize: true,
  logging: false,
  sync: {
    alter: true,
    // force: true,
  },
});
