import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UserModel } from '../../core/models'
import { MailService } from '../libs/mail/mail.service'
import { Cron } from '@nestjs/schedule'
import { Op } from 'sequelize'

@Injectable()
export class CronService {
  public constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    private readonly mailService: MailService,
  ) {}

  @Cron('0 0 * * * *')
  public async deleteDeactivatedAccounts() {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDay() - 7)

    const deactivatedAccounts = await this.userModel.findAll({
      where: {
        isDeactivated: true,
        deactivatedAt: {
          [Op.lte]: sevenDaysAgo,
        },
      },
    })

    for (const user of deactivatedAccounts) {
      await this.mailService.sendAccountDeletion(user.email)
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
