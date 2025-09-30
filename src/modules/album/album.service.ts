import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AlbumRepository } from 'src/database/prisma/repositories/album.repository';
import { CreateAlbumDto } from './dto/create-album.dto';
import { B2Storage } from 'src/storage/b2-storage';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private storage: B2Storage,
  ) {}

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
      throw new InternalServerErrorException('Erro ao criar álbum!');
    }
  }

  async findMany() {
    try {
      return await this.albumRepository.findMany();
    } catch {
      throw new InternalServerErrorException('Error ao listar álbuns!');
    }
  }

  async findManyWithPhotos(page: number) {
    try {
      const { albums, hasMore } =
        await this.albumRepository.findManyWithPhotos(page);

      const parsedAlbums = albums.map(async (album) => ({
        ...album,
        photos: await this.storage.list(
          album.photos.slice(0, 4).map((p) => p.photo),
        ),
      }));

      return {
        albums: await Promise.all(parsedAlbums),
        hasMore,
      };
    } catch {
      throw new InternalServerErrorException('Error ao listar álbuns!');
    }
  }
}
