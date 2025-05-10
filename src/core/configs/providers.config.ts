import { ConfigService } from "@nestjs/config";
import { Options } from "src/modules/auth/provider/provider.const";
import { GoogleProvider } from "src/modules/auth/provider/services/google.provider";
import { YandexProvider } from "src/modules/auth/provider/services/yandex.provider";

export const getProvidersConfig = async (configService: ConfigService): Promise<Options> => ({
  baseUrl: configService.getOrThrow<string>("APPLICATION_URL"),
  services: [
    new GoogleProvider({
      client_id: configService.getOrThrow<string>("GOOGLE_CLIENT_ID"),
      client_secret: configService.getOrThrow<string>("GOOGLE_CLIENT_SECRET"),
      scopes: ["email", "profile"],
    }),
    new YandexProvider({
      client_id: configService.getOrThrow<string>("YANDEX_CLIENT_ID"),
      client_secret: configService.getOrThrow<string>("YANDEX_CLIENT_SECRET"),
      scopes: ["login:email", "login:avatar", "login:info"],
    })
  ]
})