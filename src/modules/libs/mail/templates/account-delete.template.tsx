import * as React from 'react'
import {
  Body,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

export const AccountDeleteTemplate = ({ domain }: { domain: string }) => {
  const registerLink = `${domain}/account/create`

  return (
    <Html>
      <Head />
      <Preview>Аккаунт удален</Preview>
      <Tailwind>
        <Body className="max-2-xl mx-auto p-6 bg-slate-50">
          <Section className="text-center">
            <Heading className="text-3xl text-black font-bold mt-2">
              Ваш аккаунт был полностью удален
            </Heading>
            <Text className="text-base text-black">
              Ваш аккаунт был полностью стерт из базы данных Kitsunaana. Все
              ваши данные и информация удалены безвозвратно.
            </Text>
          </Section>

          <Section className="bg-white text-black text-center rounded-lg shadow-md p-6 mb-6">
            <Text>
              Вы больше не будете получать уведомления в Telegram и на почту
            </Text>
            <Text>
              Если вы захотите вернуться на платформу, вы можете
              зарегистрироваться по следующей ссылке:
            </Text>
            <Link
              href={registerLink}
              className="inline-flex justify-center items-center rounded-md mt-2 text-sm font-medium text-white bg-[#18b9ae] px-5 py-2 rounded-xs"
            >
              Зарегистрироваться на Kitsunaana
            </Link>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  )
}
