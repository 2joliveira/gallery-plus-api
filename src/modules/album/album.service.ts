import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AlbumRepository } from 'src/database/prisma/repositories/album.repository';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async create({ title, photosIds = [] }: CreateAlbumDto) {
    try {
      return await this.albumRepository.create({
        data: {
          title,
          photos:
            photosIds.length > 0
              ? {
                  create: photosIds.map((photoId) => ({
                    photo: { connect: { id: photoId } },
                  })),
                }
              : undefined,
        },
        include: {
          photos: {
            select: {
              photoId: true,
              albumId: true,
            },
          },
        },
      });
    } catch {
      throw new InternalServerErrorException('Erro ao criar álbum');
    }
  }
}
