import { Markup } from 'telegraf'

export const BUTTONS = {
  authSuccess: Markup.inlineKeyboard([
    [Markup.button.callback('Просмотреть профиль', 'me')],
    [Markup.button.url('На сайт', 'https://kitsunaana.store')],
  ]),
  profile: Markup.inlineKeyboard([
    Markup.button.url(
      'Настройки аккаунта',
      'https://kitsunaana.store/dashboard/settings',
    ),
  ]),
}
