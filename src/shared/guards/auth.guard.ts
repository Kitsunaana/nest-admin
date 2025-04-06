import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UserModel } from '../../core/models'

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    if (typeof request.session.userId === 'undefined') {
      throw new UnauthorizedException('unauthorized')
    }

    request.user = await this.userModel.findOne({
      where: {
        id: request.session.userId,
      },
    })

    return true
  }
}
