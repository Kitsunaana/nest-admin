import 'express-session'
import { SessionMetadata } from './session-metadata.type'

declare module 'express-session' {
  interface SessionData {
    userId?: string
    createdAt?: Date | string
    metadata: SessionMetadata
    refreshToken: string
    test: string
  }
}
