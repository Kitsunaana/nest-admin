import { ArgumentMetadata, PipeTransform } from '@nestjs/common'

export class JSONParsePipe implements PipeTransform {
  constructor(private readonly propertyName: string) {}

  transform(value: any, metadata: ArgumentMetadata): any {
    if (metadata.type === 'body' && metadata.data === this.propertyName) {
      return JSON.parse(value)
    }

    return value
  }
}
