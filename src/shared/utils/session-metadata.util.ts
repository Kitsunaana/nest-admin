import type { Request } from 'express'
import { lookup } from 'geoip-lite'
import * as countries from 'i18n-iso-countries'
// eslint-disable-next-line @typescript-eslint/no-require-imports
import DeviceDetector = require('device-detector-js')
import { SessionMetadata } from '../types'
import { IS_DEV_ENV } from './is-dev.util'

// eslint-disable-next-line @typescript-eslint/no-require-imports
countries.registerLocale(require('i18n-iso-countries/langs/en.json'))

export const getSessionMetadata = (
  request: Request,
  userArgent: string,
): SessionMetadata => {
  const connectingHeaderKey = 'cf-connecting-ip'
  const forwardedHeaderKey = 'x-forwarded-for'

  const connectingHeader: string = Array.isArray(
    request.headers[connectingHeaderKey],
  )
    ? request.headers[connectingHeaderKey][0]
    : request.headers[connectingHeaderKey]

  const forwardedHeader: string =
    typeof request.headers[forwardedHeaderKey] === 'string'
      ? request.headers[forwardedHeaderKey].split(',')[0]
      : request.ip

  const ip = IS_DEV_ENV
    ? '173.166.164.121'
    : connectingHeader || forwardedHeader
  const location = lookup(ip)
  const device = new DeviceDetector().parse(userArgent)

  return {
    location: {
      country: countries.getName(location.country, 'en') || 'Неизвестно',
      city: location.city,
      latitude: location.ll[0] ?? 0,
      longitude: location.ll[1] ?? 0,
    },
    device: {
      browser: device.client?.name,
      type: device.device?.type,
      os: device.os?.name,
    },
    ip,
  }
}
