import {
  Body,
  Controller,
  Patch,
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

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Authorization()
  @Patch('/change-avatar')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'avatars', maxCount: 10 }]))
  @UsePipes(new FileValidationPipe('avatars'), new JSONParsePipe('data'))
  public async changeAvatar(
    @UploadedFiles() avatars: Express.Multer.File[],
    @Authorized() user: UserModel,
    @Body('data') input: any,
  ) {
    console.log(avatars)
    return this.profileService.changeAvatar(user, avatars)
  }

  @Authorization()
  @Patch('/change-info')
  public async changeInfo(
    @Authorized() user: UserModel,
    @Body(new ZodValidationPipe(changeProfileInfoInputSchema))
    input: ChangeProfileInfoInput,
  ) {
    return this.profileService.changeInfo(user, input)
  }
}
