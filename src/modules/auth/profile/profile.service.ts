import { ConflictException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { AvatarModel, UserModel } from '../../../core/models'
import { StorageService } from '../../libs/storage/storage.service'
import { v4 } from 'uuid'
import { ChangeProfileInfoInput } from './inputs/change-profile-info.input'

@Injectable()
export class ProfileService {
  public constructor(
    @InjectModel(AvatarModel) private readonly avatarModel: typeof AvatarModel,
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,

    private readonly storageService: StorageService,
  ) {}

  public async changeAvatar(user: UserModel, avatars: Express.Multer.File[]) {
    for await (const avatar of avatars) {
      const filename = `/avatars/${user.username}-${v4()}.webp`

      await this.storageService.upload(avatar.buffer, filename, 'image/webp')

      await this.avatarModel.create({
        userId: user.id,
        path: filename,
      })
    }

    return true
  }

  public async changeInfo(user: UserModel, input: ChangeProfileInfoInput) {
    const { username, displayName, bio } = input

    const usernameExists = await this.userModel.findOne({
      where: {
        username,
      },
    })

    if (usernameExists && username !== user.username)
      throw new ConflictException('usernameExists')

    await this.userModel.update(
      {
        username,
        displayName,
        bio,
      },
      {
        where: {
          id: user.id,
        },
      },
    )

    return true
  }
}
