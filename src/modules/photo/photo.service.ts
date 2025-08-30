import { Injectable } from '@nestjs/common';
import { PhotoRepository } from 'src/database/prisma/repositories/photo.repository';
import { B2Storage } from 'src/storage/b2-storage';

@Injectable()
export class PhotoService {
  constructor(
    private readonly photoRepository: PhotoRepository,
    private storage: B2Storage,
  ) {}

  async create(file: Express.Multer.File) {
    try {
      const { url } = await this.storage.upload({
        fileName: file.filename,
        fileType: file.mimetype,
        body: file.buffer,
      });

      return await this.photoRepository.create({ data: { url } });
    } catch {
      console.log('Error');
    }
  }

  async findmany() {
    try {
      const photos = await this.photoRepository.findMany();

      return await this.storage.list(photos);
      return photos;
    } catch {
      console.log('Error');
    }
  }
}
