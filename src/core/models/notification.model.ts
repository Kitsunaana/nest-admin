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
import { User } from './user.model';

export enum NotificationType {
  ENABLE_TWO_FACTOR = 'ENABLE_TWO_FACTOR',
}

@Table({ tableName: 'notifications' })
export class Notification extends Model<Notification> {
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

  @ForeignKey(() => User)
  @Column({ field: 'user_id', type: DataType.UUID, allowNull: true })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @Default(DataType.NOW)
  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: Date;

  @Default(DataType.NOW)
  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: Date;
}
