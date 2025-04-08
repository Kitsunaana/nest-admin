import {
  Body,
  Controller,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common'
import { ProfileService } from './profile.service'
import { Authorization, Authorized } from '../../../shared/decorators'
import { UserModel } from '../../../core/models'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import {
  FileValidationPipe,
  JSONParsePipe,
  ZodValidationPipe,
} from '../../../shared/pipes'
import {
  ChangeProfileInfoInput,
  changeProfileInfoInputSchema,
} from './inputs/change-profile-info.input'
import {
  updateAvatarsInputSchema,
  type UpdateAvatarsInput,
} from './inputs/update-avatars.input'

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Authorization()
  @Post('/change-avatar')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'avatars', maxCount: 10 }]))
  @UsePipes(new FileValidationPipe('avatars'))
  public async changeAvatar(
    @UploadedFiles() avatars: Express.Multer.File[],
    @Authorized() user: UserModel,
  ) {
    return this.profileService.changeAvatar(user, avatars)
  }

  @Authorization()
  @Post('/remove-avatars')
  public async removeAvatars(
    @Authorized() user: UserModel,
    @Body(new ZodValidationPipe(updateAvatarsInputSchema))
    input: UpdateAvatarsInput,
  ) {
    return this.profileService.removeAvatars(user, input)
  }

  @Authorization()
  @Post('/change-order-avatars')
  public async changeOrderAvatars(
    @Authorized() user: UserModel,
    @Body(new ZodValidationPipe(updateAvatarsInputSchema))
    input: UpdateAvatarsInput,
  ) {
    return this.profileService.changeOrderAvatars(user, input)
  }

  @Authorization()
  @Post('/change-info')
  public async changeInfo(
    @Authorized() user: UserModel,
    @Body(new ZodValidationPipe(changeProfileInfoInputSchema))
    input: ChangeProfileInfoInput,
  ) {
    return this.profileService.changeInfo(user, input)
  }
}
