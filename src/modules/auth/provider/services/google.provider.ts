import { BaseOAuthService } from "./base-oauth.service";
import { ProviderOptions } from "./types/provider-options.type";
import { UserInfo } from "./types/user-info";

type GoogleProfile = {
  aud: string
  azp: string
  email: string
  email_verified: boolean
  exp: number
  family?: string
  given_name: string
  hd?: string
  iat: number
  iss: string
  jti?: string
  locale?: string
  name: string
  nbf?: number
  picture: string
  sub: string
  access_token: string
  refresh_token?: string
}

export class GoogleProvider extends BaseOAuthService {
  public constructor(options: ProviderOptions) {
    super({
      name: "google",
      authorize_url: "https://accounts.google.com/o/oauth2/v2/auth",
      access_url: "https://oauth2.googleapis.com/token",
      profile_url: "https://www.googleapis.com/oauth2/v3/userinfo",
      scopes: options.scopes,
      client_id: options.client_id,
      client_secret: options.client_secret,
    })
  }

  public async extractUserInfo(data: GoogleProfile): Promise<UserInfo> {
    return super.extractUserInfo({
      email: data.email,
      name: data.name,
      picture: data.picture
    })
  }
}