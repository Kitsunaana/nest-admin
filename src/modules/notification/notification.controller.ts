import { Body, Controller, Get, Patch } from '@nestjs/common'
import { NotificationService } from './notification.service'
import { Authorization, Authorized } from '../../shared/decorators'
import { UserModel } from '../../core/models'
import {
  ChangeNotificationsSettingsInput,
  changeNotificationsSettingsInputSchema,
} from './inputs/change-notifications.input'
import { ZodValidationPipe } from '../../shared/pipes'

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Authorization()
  @Get('unread-count')
  public async findUnreadCount(@Authorized() user: UserModel) {
    return this.notificationService.findUnreadCount(user)
  }

  @Authorization()
  @Get('/all')
  public async findByUser(@Authorized() user: UserModel) {
    return this.notificationService.findByUser(user)
  }

  @Authorization()
  @Patch()
  public async changeSettings(
    @Authorized() user: UserModel,
    @Body(new ZodValidationPipe(changeNotificationsSettingsInputSchema))
    input: ChangeNotificationsSettingsInput,
  ) {
    return this.notificationService.changeSettings(user, input)
  }
}
