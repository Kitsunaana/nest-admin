import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import {
  AvatarModel,
  NotificationSettingsModel,
  UserModel,
} from '../../core/models'
import { MailService } from '../libs/mail/mail.service'
import { Cron } from '@nestjs/schedule'
import { Op } from 'sequelize'
import { StorageService } from '../libs/storage/storage.service'
import { TelegramService } from '../libs/telegram/telegram.service'

@Injectable()
export class CronService {
  public constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    @InjectModel(AvatarModel) private readonly avatarModel: typeof AvatarModel,

    private readonly mailService: MailService,
    private readonly storageService: StorageService,
    private readonly telegramService: TelegramService,
  ) {}

  @Cron('0 0 * * * *')
  public async deleteDeactivatedAccounts() {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDay() - 7)

    const deactivatedAccounts = await this.userModel.findAll({
      include: [NotificationSettingsModel],
      where: {
        isDeactivated: true,
        deactivatedAt: {
          [Op.lte]: sevenDaysAgo,
        },
      },
    })

    for (const user of deactivatedAccounts) {
      await this.mailService.sendAccountDeletion(user.email)

      const avatars = await this.avatarModel.findAll({
        where: {
          userId: user.id,
        },
      })

      for (const avatar of avatars) {
        await this.storageService.remove(avatar.path)

        await avatar.destroy()
      }

      if (
        user?.notificationSettings?.telegramNotifications &&
        user.telegramId
      ) {
        await this.telegramService.sendAccountDelete(user.telegramId)
      }
    }

    await this.userModel.destroy({
      where: {
        isDeactivated: true,
        deactivatedAt: {
          [Op.lte]: sevenDaysAgo,
        },
      },
    })
  }
}
