/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { Photo } from '@prisma/client';
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
      imageId: uniqueFileName,
    };
  }

  async list(photos: Photo[]) {
    const parsedphotos = await Promise.all(
      photos.map(async (file) => {
        const getObjCommand = new GetObjectCommand({
          Bucket: this.envService.get('AWS_BUCKET_NAME'),
          Key: file.imageId,
        });

        const signedUrl = await getSignedUrl(this.client, getObjCommand, {
          expiresIn: 3600,
        });

        return {
          ...file,
          url: signedUrl,
        };
      }),
    );

    return parsedphotos;
  }
}
