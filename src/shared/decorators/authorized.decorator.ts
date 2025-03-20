import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import { UserModel } from '../../core/models'

export const Authorized = createParamDecorator(
  (data: keyof UserModel, context: ExecutionContext) => {
    const user: UserModel = context.switchToHttp().getRequest().user

    return data ? user[data] : user
  },
)
