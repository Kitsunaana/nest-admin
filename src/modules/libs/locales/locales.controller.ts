import { Controller, Get, Param } from '@nestjs/common'
import { translate } from './translate'

type GetTranslateInput = 'ru' | 'en'

@Controller('locales')
export class LocalesController {
  constructor() {}

  @Get('/:lng')
  public translate(@Param('lng') lng: GetTranslateInput) {
    return translate[lng]
  }
}
