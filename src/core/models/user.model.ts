import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  DataType,
  HasMany,
  HasOne,
  BelongsTo,
  ForeignKey,
  AllowNull,
  Unique,
} from 'sequelize-typescript';
import { Token } from './token.model';
import { SocialLink } from './social-link.model';
import { Notification } from './notification.model';
import { NotificationSettings } from './notification-settings.model';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column({ unique: true })
  email: string;

  @Column
  password: string;

  @Column({ field: 'telegram_id', allowNull: true, unique: true })
  telegramId: string;

  @Column({ unique: true })
  username: string;

  @Column({ field: 'display_name' })
  displayName: string;

  @Column({ allowNull: true })
  avatar: string;

  @Column({ allowNull: true })
  bio: string;

  @Default(false)
  @Column({ field: 'is_verified' })
  isVerified: boolean;

  @Default(false)
  @Column({ field: 'is_email_verified' })
  isEmailVerified: boolean;

  @Default(false)
  @Column({ field: 'is_totp_enabled' })
  isTotpEnabled: boolean;

  @Column({ field: 'totp_secret', allowNull: true })
  totpSecret: string;

  @Default(false)
  @Column({ field: 'is_deactivated' })
  isDeactivated: boolean;

  @Column({ field: 'deactivated_at', type: DataType.DATE, allowNull: true })
  deactivatedAt: Date;

  @HasMany(() => Token)
  tokens: Token[];

  @HasMany(() => SocialLink)
  socialLinks: SocialLink[];

  @HasMany(() => Notification)
  notifications: Notification[];

  @HasOne(() => NotificationSettings)
  notificationSettings: NotificationSettings;

  @Default(DataType.NOW)
  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: Date;

  @Default(DataType.NOW)
  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: Date;
}
