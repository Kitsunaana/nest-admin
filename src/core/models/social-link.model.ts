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

@Table({ tableName: 'social_links' })
export class SocialLink extends Model<SocialLink> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column
  title: string;

  @Column
  url: string;

  @Column
  position: number;

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
