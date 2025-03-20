import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Default,
  DataType,
  ForeignKey,
  BelongsTo, Unique,
} from 'sequelize-typescript';
import { UserModel } from './user.model';

export enum TokenType {
  EMAIL_VERIFY = 'EMAIL_VERIFY',
  PASSWORD_RESET = 'PASSWORD_RESET',
  DEACTIVATE_ACCOUNT = 'DEACTIVATE_ACCOUNT',
  TELEGRAM_AUTH = 'TELEGRAM_AUTH',
}

@Table({ tableName: 'tokens' })
export class TokenModel extends Model<TokenModel> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column({ unique: true })
  token: string;

  @Column(DataType.ENUM(...Object.values(TokenType)))
  type: TokenType;

  @Column({ field: 'expires_in', type: DataType.DATE })
  expiresIn: Date;

  @ForeignKey(() => UserModel)
  @Column({ field: 'user_id', type: DataType.UUID })
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
