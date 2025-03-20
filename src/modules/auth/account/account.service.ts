import { ConflictException, Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { UserModel } from '../../../core/models'
import { CreateUserInput } from './input/create-user.input'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class AccountService {
  public constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
  ) {}

  public async me(id: string) {
    return this.userModel.findOne({
      where: {
        id,
      },
    })
  }

  public async create(input: CreateUserInput) {
    const { username, email, password } = input

    const isUsernameExists = await this.userModel.findOne({
      where: {
        username,
      },
    })

    if (isUsernameExists)
      throw new ConflictException('Это имя пользователя уже занято')

    const isEmailExists = await this.userModel.findOne({
      where: {
        email,
      },
    })

    if (isEmailExists) throw new ConflictException('Это имя почты уже занято')

    const user = await this.userModel.create({
      email,
      username,
      displayName: username,
      password: await hash(password),
    })

    return true
  }
}
