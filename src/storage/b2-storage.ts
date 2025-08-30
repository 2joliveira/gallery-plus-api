import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { EnvService } from 'src/env/env.service';

interface UploadProps {
  fileName: string;
  fileType: string;
  body: Buffer;
}
@Injectable()
export class B2Storage {
  private client: S3Client;

  constructor(private envService: EnvService) {
    this.client = new S3Client({
      endpoint: envService.get('B2_STORAGE_ENDPOINT'),
      region: 'us-east-005',
      credentials: {
        accessKeyId: envService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: envService.get('AWS_SECRET_ACCESS_KEY'),
      },
      forcePathStyle: true,
    });
  }

  async upload({ fileName, fileType, body }: UploadProps) {
    const uploadId = randomUUID();
    const uniqueFileName = `${uploadId}-${fileName}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.envService.get('AWS_BUCKET_NAME'),
        Key: uniqueFileName,
        ContentType: fileType,
        Body: body,
      }),
    );

    return {
      url: uniqueFileName,
    };
  }
}
