import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PhotoRepository } from 'src/database/prisma/repositories/photo.repository';
import { B2Storage } from 'src/storage/b2-storage';
import { PhotoDto } from './dto/photo.dto';

@Injectable()
export class PhotoService {
  constructor(
    private readonly photoRepository: PhotoRepository,
    private storage: B2Storage,
  ) {}

  async create(data: PhotoDto, file: Express.Multer.File) {
    try {
      const { imageId } = await this.storage.upload({
        fileName: data.title,
        fileType: file.mimetype,
        body: file.buffer,
      });

      if (imageId) {
        return await this.photoRepository.create({
          data: { ...data, imageId },
        });
      }
      return null;
    } catch {
      throw new InternalServerErrorException('Erro ao criar foto');
    }
  }

  async findmany() {
    try {
      const photos = await this.photoRepository.findMany();

      return await this.storage.list(photos);
    } catch {
      throw new InternalServerErrorException('Error ao listar fotos!');
    }
  }
}
