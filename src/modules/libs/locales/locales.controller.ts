import { Controller, Get, Param } from '@nestjs/common'
import { LocalesService } from './locales.service'
import { translate } from './translate'

type GetTranslateInput = 'ru' | 'en'

@Controller('locales')
export class LocalesController {
  constructor(private readonly localesService: LocalesService) {}

  @Get('/:lng')
  public translate(@Param('lng') lng: GetTranslateInput) {
    return translate[lng]
  }
}
