import { Injectable } from '@nestjs/common'
import {
  DeleteObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'
import { writeFile, unlink } from 'fs/promises'
import * as process from 'node:process'

@Injectable()
export class StorageService {
  private readonly client: S3Client
  private readonly bucket: string

  public constructor(private readonly configService: ConfigService) {
    this.client = new S3Client({
      endpoint: this.configService.getOrThrow<string>('S3_ENDPOINT'),
      region: this.configService.getOrThrow<string>('S3_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('S3_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow<string>(
          'S3_SECRET_ACCESS_KEY',
        ),
      },
    })

    this.bucket = this.configService.getOrThrow<string>('S3_BUCKET_NAME')
  }

  private uploadDir = join(process.cwd(), 'uploads')

  public async upload(buffer: Buffer, key: string, mimetype: string) {
    const command: PutObjectCommandInput = {
      Body: buffer,
      Key: String(key),
      Bucket: this.bucket,
      ContentType: mimetype,
    }

    const filePath = join(this.uploadDir, key)
    await writeFile(filePath, buffer)

    await this.client.send(new PutObjectCommand(command))
  }

  public async remove(key: string) {
    const command: DeleteObjectCommandInput = {
      Key: key,
      Bucket: this.bucket,
    }

    const fullPath = join(this.uploadDir, key)
    await unlink(fullPath)

    // await this.client.send(new DeleteObjectCommand(command))
  }
}
