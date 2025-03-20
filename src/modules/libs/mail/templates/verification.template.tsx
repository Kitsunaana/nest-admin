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
import * as React from 'react'

interface VerificationTemplateProps {
  domain: string
  token: string
}

export const VerificationTemplate = ({
  domain,
  token,
}: VerificationTemplateProps) => {
  const verificationLink = `${domain}/account/verify?token=${token}`

  return (
    <Html>
      <Head />
      <Preview>Верификация аккаунта</Preview>
      <Tailwind>
        <Body className="max-2-xl mx-auto p-6 bg-slate-50">
          <Section className="text-center mb-8">
            <Heading className="text-3xl text-black font-bold mb">
              Подтверждение вашей почты
            </Heading>
            <Text className="text-base text-black">
              Спасибо за регистрацию на Kitsunaana, чтобы подтвердить свой адрес
              электронной почты, пожалуйста, перейдите по ссылке
            </Text>
            <Link
              href={verificationLink}
              className="p-2 inline-flex justify-center items-center rounded-md text-sm font-medium text-white bg-[#18B9AE]"
            >
              Подтвердить почту
            </Link>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  )
}
