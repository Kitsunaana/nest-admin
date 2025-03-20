import type { Request } from 'express'
import { InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UserModel } from '../../core/models'
import { SessionMetadata } from '../types'

export const saveSession = (
  request: Request,
  user: UserModel,
  metadata: SessionMetadata,
) => {
  return new Promise((resolve, reject) => {
    request.session.createdAt = new Date()
    request.session.userId = user.id
    request.session.metadata = metadata

    request.session.save((error) => {
      if (error) {
        return reject(new InternalServerErrorException('failedSaveSession'))
      }

      return resolve(user)
    })
  })
}

export const destroySession = (
  request: Request,
  configService: ConfigService,
) => {
  return new Promise((resolve, reject) => {
    request.session.destroy((error) => {
      if (error) {
        return reject(
          new InternalServerErrorException('Не удалось завершить сессию'),
        )
      }

      request.res.clearCookie(configService.getOrThrow<string>('SESSION_NAME'))

      resolve(true)
    })
  })
}
