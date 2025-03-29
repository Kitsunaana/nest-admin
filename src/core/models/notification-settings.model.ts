import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import { UserModel } from './user.model'

@Table({ tableName: 'notification_settings' })
export class NotificationSettingsModel extends Model<NotificationSettingsModel> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string

  @Default(true)
  @Column({ field: 'site_notification' })
  siteNotifications: boolean

  @Default(true)
  @Column({ field: 'telegram_notifications' })
  telegramNotifications: boolean

  @ForeignKey(() => UserModel)
  @Column({ field: 'user_id', type: DataType.UUID })
  userId: string

  @BelongsTo(() => UserModel)
  user: UserModel

  @Default(DataType.NOW)
  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: Date

  @Default(DataType.NOW)
  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: Date
}
