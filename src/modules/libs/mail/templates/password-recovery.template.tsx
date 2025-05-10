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
import { SessionMetadata } from '../../../../shared/types'

const PasswordRecoveryTemplate = ({
  domain,
  token,
  metadata,
}: {
  domain: string
  token: string
  metadata: SessionMetadata
}) => {
  const resetLink = `${domain}/account/recovery/${token}`

  return (
    <Html>
      <Head />
      <Preview>Сброс пароля</Preview>
      <Tailwind>
        <Body className="max-2-xl mx-auto p-6 bg-slate-50">
          <Section className="text-center mb-8">
            <Heading className="text-3xl text-black font-bold mb">
              Сброс пароля
            </Heading>
            <Text className="text-base text-black">
              Вы запросили сброс пароля для вашей учетной записи.
            </Text>
            <Text className="text-base text-black">
              Чтобы создать новый пароль, нажмите на ссылку ниже:
            </Text>
            <Link
              href={resetLink}
              className="p-2 inline-flex justify-center items-center rounded-md text-sm font-medium text-white bg-pink-400"
            >
              Сбросить пароль
            </Link>
          </Section>

          <Section className="bg-gray-100 rounded-lg p-6 mb-6">
            <Heading className="text-xl font-semibold text-pink-400">
              Информация о запросе:
            </Heading>

            <ul className="list-disc list-inside mt-2">
              <li>
                🌍 Расположение: {metadata.location.country},{' '}
                {metadata.location.city}
              </li>
              <li>📱 Операционная система: {metadata.device.os}</li>
              <li>🌐 Браузер: {metadata.device.browser}</li>
              <li>💻 IP-адрес: {metadata.ip}</li>
            </ul>
            <Text className="test-gray-600 mt-2">
              Если вы не инициировали этот запрос, пожалуйста, игнорируйте это
              сообщение.
            </Text>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default PasswordRecoveryTemplate
