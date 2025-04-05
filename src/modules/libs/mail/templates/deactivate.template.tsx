import * as React from 'react'
import {
  Body,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import { type SessionMetadata } from '../../../../shared/types'

export const DeactivateTemplate = ({
  token,
  metadata,
}: {
  token: string
  metadata: SessionMetadata
}) => {
  return (
    <Html>
      <Head />
      <Preview>Деактивация аккаунта</Preview>
      <Tailwind>
        <Body className="max-2-xl mx-auto p-6 bg-slate-50">
          <Section className="text-center mb-8">
            <Heading className="text-3xl text-black font-bold mb">
              Запрос на деактивацию аккаунта
            </Heading>
            <Text className="text-base text-black">
              Вы инициировали запрос на деактивацию вашей учетной записи на
              платформе <b>Kitsunaana</b>.
            </Text>
          </Section>

          <Section className="bg-gray-100 rounded-lg p-6 text-center mb-6">
            <Heading className="text-2xl text-black font-semibold">
              Код подтверждения:
            </Heading>

            <Heading className="text-3xl text-black font-semibold">
              {token}
            </Heading>
            <Text className="text-black">
              Этот код действителен в течение 5 минут.
            </Text>
          </Section>

          <Section className="bg-gray-100 rounded-lg p-6 mb-6">
            <Heading className="text-xl font-semibold text-[#18B9AE]">
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
