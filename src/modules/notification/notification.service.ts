import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import {
  NotificationModel,
  NotificationSettingsModel,
  TokenModel,
  TokenType,
  UserModel,
} from '../../core/models'
import { ChangeNotificationsSettingsInput } from './inputs/change-notifications.input'
import { generateToken } from '../../shared/utils'

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: typeof UserModel,

    @InjectModel(TokenModel)
    private readonly tokenModel: typeof TokenModel,

    @InjectModel(NotificationModel)
    private readonly notificationModel: typeof NotificationModel,

    @InjectModel(NotificationSettingsModel)
    private readonly notificationSettingsModel: typeof NotificationSettingsModel,
  ) {}

  public async findUnreadCount(user: UserModel) {
    return this.notificationModel.count({
      where: {
        userId: user.id,
      },
    })
  }

  public async findByUser(user: UserModel) {
    await this.notificationModel.update(
      {
        isRead: true,
      },
      {
        where: {
          isRead: false,
          userId: user.id,
        },
      },
    )

    return this.notificationModel.findAll({
      order: [['createdAt', 'desc']],
      where: {
        userId: user.id,
      },
    })
  }

  public async changeSettings(
    user: UserModel,
    input: ChangeNotificationsSettingsInput,
  ) {
    const { telegramNotifications, siteNotifications } = input

    const [notificationsSettings] = await this.notificationSettingsModel.upsert(
      {
        userId: user.id,
        siteNotifications,
        telegramNotifications,
      },
    )

    if (notificationsSettings.telegramNotifications && !user.telegramId) {
      const telegramAuthToken = await generateToken({
        isUUID: true,
        userId: user.id,
        tokenModel: this.tokenModel,
        type: TokenType.TELEGRAM_AUTH,
      })

      return {
        notificationsSettings,
        telegramAuthToken: telegramAuthToken.token,
      }
    }

    if (!notificationsSettings.telegramNotifications && user.telegramId) {
      await this.userModel.update(
        {
          telegramId: null,
        },
        {
          where: {
            id: user.id,
          },
        },
      )

      return {
        notificationsSettings,
      }
    }

    return {
      notificationsSettings,
    }
  }
}
