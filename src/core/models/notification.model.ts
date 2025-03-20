import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserModel } from './user.model';

export enum NotificationType {
  ENABLE_TWO_FACTOR = 'ENABLE_TWO_FACTOR',
}

@Table({ tableName: 'notifications' })
export class NotificationModel extends Model<NotificationModel> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column
  message: string;

  @Column(DataType.ENUM(...Object.values(NotificationType)))
  type: NotificationType;

  @Default(false)
  @Column({ field: 'is_read' })
  isRead: boolean;

  @ForeignKey(() => UserModel)
  @Column({ field: 'user_id', type: DataType.UUID, allowNull: true })
  userId: string;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @Default(DataType.NOW)
  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: Date;

  @Default(DataType.NOW)
  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: Date;
}
