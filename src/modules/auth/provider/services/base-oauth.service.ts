import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { BaseProviderOptions } from "./types/base-provider.options.type";
import { UserInfo } from "./types/user-info";

@Injectable()
export class BaseOAuthService {
  private BASE_URL: string

  public constructor(private readonly options: BaseProviderOptions) { }

  protected async extractUserInfo(data: any): Promise<UserInfo> {
    return {
      ...data,
      provider: this.options.name
    }
  }

  public getRedirectUrl() {
    return `${this.BASE_URL}/session/oauth/callback/${this.options.name}`
  }

  public getAuthUrl() {
    console.log({
      redirect: this.getRedirectUrl()
    })
    const query = new URLSearchParams({
      response_type: "code",
      client_id: this.options.client_id,
      redirect_uri: this.getRedirectUrl(),
      scope: (this.options.scopes ?? []).join(" "),
      access_type: "offline",
      prompt: "select_account"
    })

    return `${this.options.authorize_url}?${query}`
  }

  public async findUserByCode(code: string): Promise<UserInfo> {
    const clientId = this.options.client_id
    const clientSecret = this.options.client_secret

    const tokenQuery = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: this.getRedirectUrl(),
      grant_type: "authorization_code",
      code,
    })

    console.log({
      clientId,
      clientSecret
    })
    const tokenRequest = await fetch(this.options.access_url, {
      method: "POST",
      body: tokenQuery,
      headers: {
        'Content-Type': "application/x-www-form-urlencoded",
        Accept: 'application/json'
      }
    })

    if (!tokenRequest.ok) {
      console.log(tokenRequest)
      throw new BadRequestException(`Не удалось получить пользователя с ${this.options.profile_url}`)
    }

    const tokenResponse = await tokenRequest.json()

    if (!tokenResponse.access_token) {
      console.log(",kznm")
      throw new BadRequestException(`Нет токенов с ${this.options.access_url}`)
    }

    const userRequest = await fetch(this.options.profile_url, {
      headers: {
        Authorization: `Bearer ${tokenResponse.access_token}`
      }
    })

    if (!userRequest.ok) {
      throw new UnauthorizedException(`Не удалось получить пользователя с ${this.options.profile_url}`)
    }

    const user = await userRequest.json()
    const userData = await this.extractUserInfo(user)

    return {
      ...userData,
      access_token: tokenResponse.access_token,
      refresh_token: tokenResponse.refresh_token,
      expires_at: tokenResponse.expires_at || tokenResponse.expires_in,
      provider: this.options.name,
    }
  }

  set baseUrl(value: string) {
    this.BASE_URL = value
  }

  get name() {
    return this.options.name
  }

  get accessUrl() {
    return this.options.access_url
  }

  get profileUrl() {
    return this.options.profile_url
  }

  get scopes() {
    return this.options.scopes
  }
}