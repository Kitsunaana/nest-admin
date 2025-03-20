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

@Table({ tableName: 'social_links' })
export class SocialLinkModel extends Model<SocialLinkModel> {
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
