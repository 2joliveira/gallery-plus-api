import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PhotoRepository } from 'src/database/prisma/repositories/photo.repository';
import { B2Storage } from 'src/storage/b2-storage';

@Injectable()
export class UploadService {
  constructor(
    private readonly photoRepository: PhotoRepository,
    private storage: B2Storage,
  ) {}

  async create(file: Express.Multer.File) {
    try {
      const { imageId } = await this.storage.upload({
        fileName: file.filename,
        fileType: file.mimetype,
        body: file.buffer,
      });

      return { imageId };
    } catch {
      throw new InternalServerErrorException('Erro ao salvar foto');
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
