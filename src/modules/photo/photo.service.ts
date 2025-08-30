import { Injectable } from '@nestjs/common';
import { PhotoRepository } from 'src/database/prisma/repositories/photo.repository';
import { B2Storage } from 'src/storage/b2-storage';

@Injectable()
export class PhotoService {
  constructor(
    private readonly photoRepository: PhotoRepository,
    private uploader: B2Storage,
  ) {}

  async create(file: Express.Multer.File) {
    try {
      const { url } = await this.uploader.upload({
        fileName: file.filename,
        fileType: file.mimetype,
        body: file.buffer,
      });

      return await this.photoRepository.create({ data: { url } });
    } catch {
      console.log('Error');
    }
  }
}
