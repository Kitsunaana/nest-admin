import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript'
import { UserModel } from './user.model'

@Table({ tableName: 'avatars' })
export class AvatarModel extends Model<AvatarModel> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string

  @Column
  path: string

  @ForeignKey(() => UserModel)
  @Column({ field: 'user_id', type: DataType.UUID })
  userId: string

  @BelongsTo(() => UserModel)
  user: UserModel
}
