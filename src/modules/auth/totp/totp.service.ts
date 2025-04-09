import { BadRequestException, Injectable } from '@nestjs/common'
import { encode } from 'hi-base32'
import { randomBytes } from 'crypto'
import { TOTP } from 'otpauth'
import * as QRCode from 'qrcode'
import { UserModel } from '../../../core/models'
import { EnableTotpInput } from './input/enable-totp.input'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class TotpService {
  public constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
  ) {}

  public async generate(user: UserModel) {
    const secret = encode(randomBytes(15)).replace(/=/g, '').substring(0, 24)

    const totp = new TOTP({
      issuer: 'Kitsunaana',
      label: user.email,
      algorithm: 'SHA1',
      digits: 6,
      secret,
    })

    const otpAuthUrl = totp.toString()
    const qrcodeUrl = await QRCode.toDataURL(otpAuthUrl)

    return {
      qrcodeUrl,
      secret,
    }
  }

  public async enable(user: UserModel, input: EnableTotpInput) {
    const { secret, pin } = input

    const totp = new TOTP({
      issuer: 'Kitsunaana',
      label: user.email,
      algorithm: 'SHA1',
      digits: 6,
      secret,
    })

    const delta = totp.validate({ token: pin })

    if (delta === null) throw new BadRequestException('incorrectPin')

    await this.userModel.update(
      {
        isTotpEnabled: true,
        totpSecret: secret,
      },
      {
        where: {
          id: user.id,
        },
      },
    )
    return true
  }

  public async disable(user: UserModel) {
    await this.userModel.update(
      {
        isTotpEnabled: false,
        totpSecret: null,
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
