import { ConflictException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { AvatarModel, UserModel } from '../../../core/models'
import { StorageService } from '../../libs/storage/storage.service'
import { v4 } from 'uuid'
import { ChangeProfileInfoInput } from './inputs/change-profile-info.input'
import { UpdateAvatarsInput } from './inputs/update-avatars.input'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ProfileService {
  public constructor(
    @InjectModel(AvatarModel) private readonly avatarModel: typeof AvatarModel,
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,

    private readonly storageService: StorageService,
    private readonly configService: ConfigService,
  ) {}

  public async removeAvatars(user: UserModel, avatars: UpdateAvatarsInput) {
    const domain = this.configService.getOrThrow<string>('APPLICATION_URL')

    for await (const avatar of avatars) {
      if (avatar.deleted) {
        await this.storageService.remove(
          avatar.path.split(domain)[1].split('/uploads')[1],
        )

        await this.avatarModel.destroy({
          where: {
            id: avatar.id,
            userId: user.id,
          },
        })
      }
    }
  }

  public async changeOrderAvatars(
    user: UserModel,
    avatars: UpdateAvatarsInput,
  ) {
    for await (const avatar of avatars) {
      await this.avatarModel.update(
        {
          order: avatar.order,
        },
        {
          where: {
            id: avatar.id,
            userId: user.id,
          },
        },
      )
    }

    return true
  }

  public async changeAvatar(user: UserModel, avatars: Express.Multer.File[]) {
    for await (const avatar of avatars) {
      const caption = `${user.username}-${v4()}`
      const filename = `/avatars/${caption}.webp`

      await this.storageService.upload(avatar.buffer, filename, 'image/webp')

      await this.avatarModel.create({
        caption,
        path: filename,
        userId: user.id,
        originalName: avatar.originalname,
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
