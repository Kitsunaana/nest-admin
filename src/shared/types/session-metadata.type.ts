export type LocationInfo = {
  country: string
  city: string
  latitude: number
  longitude: number
}

export type DeviceInfo = {
  browser: string
  type: string
  os: string
}

export type SessionMetadata = {
  location: LocationInfo
  device: DeviceInfo
  ip: string
}
