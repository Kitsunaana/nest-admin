import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  DataType,
  HasMany,
  HasOne,
} from 'sequelize-typescript'
import { TokenModel } from './token.model'
import { SocialLinkModel } from './social-link.model'
import { NotificationModel } from './notification.model'
import { NotificationSettingsModel } from './notification-settings.model'

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string

  @Column({ unique: true })
  email: string

  @Column
  password: string

  @Column({ field: 'telegram_id', allowNull: true, unique: true })
  telegramId: string

  @Column({ unique: true })
  username: string

  @Column({ field: 'display_name' })
  displayName: string

  @Column({ allowNull: true })
  avatar: string

  @Column({ allowNull: true })
  bio: string

  @Column({ field: 'is_verified', defaultValue: false })
  isVerified: boolean

  @Column({ field: 'is_email_verified', defaultValue: false })
  isEmailVerified: boolean

  @Column({ field: 'is_totp_enabled', defaultValue: false })
  isTotpEnabled: boolean

  @Column({ field: 'totp_secret', allowNull: true })
  totpSecret: string

  @Column({ field: 'is_deactivated', defaultValue: false })
  isDeactivated: boolean

  @Column({ field: 'deactivated_at', type: DataType.DATE, allowNull: true })
  deactivatedAt: Date

  @HasMany(() => TokenModel)
  tokens: TokenModel[]

  @HasMany(() => SocialLinkModel)
  socialLinks: SocialLinkModel[]

  @HasMany(() => NotificationModel)
  notifications: NotificationModel[]

  @HasOne(() => NotificationSettingsModel)
  notificationSettings: NotificationSettingsModel

  @Default(DataType.NOW)
  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: Date

  @Default(DataType.NOW)
  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: Date
}
