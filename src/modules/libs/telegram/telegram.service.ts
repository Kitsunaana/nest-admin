import { Action, Command, Ctx, Start, Update } from 'nestjs-telegraf'
import { Injectable } from '@nestjs/common'
import { Context, Telegraf } from 'telegraf'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/sequelize'
import { TokenModel, TokenType, UserModel } from '../../../core/models'
import { MESSAGES } from './telegram.message'
import { BUTTONS } from './telegram.buttons'

@Update()
@Injectable()
export class TelegramService extends Telegraf {
  private readonly _token: string

  public constructor(
    @InjectModel(TokenModel) private readonly tokenModel: typeof TokenModel,
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,

    private readonly configService: ConfigService,
  ) {
    const token = configService.getOrThrow<string>('TELEGRAM_BOT_TOKEN')
    super(token)

    this._token = token
  }

  @Start()
  public async onStart(@Ctx() ctx: any) {
    const chatId = ctx.chat.id.toString()
    const token = ctx.message.text.split(' ')[1]

    if (token) {
      const authToken = await this.tokenModel.findOne({
        where: {
          token,
          type: TokenType.TELEGRAM_AUTH,
        },
      })

      if (!authToken) return await ctx.reply(MESSAGES.invalidToken)

      const hasExpired = new Date(authToken.expiresIn) < new Date()

      if (hasExpired) return await ctx.reply(MESSAGES.invalidToken)

      await this.connectTelegram(authToken.userId, chatId)

      await this.tokenModel.destroy({
        where: {
          id: authToken.id,
        },
      })

      await ctx.reply(MESSAGES.authSuccess, BUTTONS.authSuccess)
    } else {
      const user = await this.findUserByChatId(chatId)

      if (user) await this.onMe(ctx)
      else await ctx.replyWithHTML(MESSAGES.welcome, BUTTONS.profile)
    }
  }

  @Command('me')
  @Action('me')
  public async onMe(@Ctx() context: Context) {
    const chatId = context.chat.id.toString()

    const user = await this.findUserByChatId(chatId)

    await context.replyWithHTML(MESSAGES.profile(user), BUTTONS.profile)
  }

  private async connectTelegram(userId: string, chatId: string) {
    await this.userModel.update(
      {
        telegramId: chatId,
      },
      {
        where: {
          id: userId,
        },
      },
    )
  }

  private async findUserByChatId(chatId: string) {
    return this.userModel.findOne({
      where: {
        telegramId: chatId,
      },
    })
  }
}
