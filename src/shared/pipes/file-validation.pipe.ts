import { BadRequestException, PipeTransform } from '@nestjs/common'
import { validateFileFormat, validateFileSize } from '../utils/file.util'

export class FileValidationPipe implements PipeTransform {
  constructor(private readonly propertyName: string) {}

  public async transform(value: any) {
    if (typeof value === 'object' && this.propertyName in value) {
      const images = value[this.propertyName] as Express.Multer.File[]

      return images.map((image) => {
        if (!image.originalname) throw new BadRequestException('fileNotUpload')

        const allowedFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif']
        const isFileFormatValid = validateFileFormat(
          image.originalname,
          allowedFormats,
        )

        if (!isFileFormatValid)
          throw new BadRequestException('unsupportedFileFormat')

        const isFileSizeValid = validateFileSize(image.size, 10 * 1024 * 1024)

        if (!isFileSizeValid)
          throw new BadRequestException('fileExceedsPermissibleSize')

        return image
      })
    }

    return value
  }
}
