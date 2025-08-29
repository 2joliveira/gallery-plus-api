import { Injectable } from '@nestjs/common';
import { PhotoRepository } from 'src/database/prisma/repositories/photo.repository';
import { PhotoDto } from './dto/photo.dto';

@Injectable()
export class PhotoService {
  constructor(private readonly photoRepository: PhotoRepository) {}

  async create({ url }: PhotoDto) {
    await this.photoRepository.create({ data: { url } });
  }
}
