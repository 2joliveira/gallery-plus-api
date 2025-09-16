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

  async create({ title, albumsIds = [] }: PhotoDto, file: Express.Multer.File) {
    try {
      const { imageId } = await this.storage.upload({
        fileName: title,
        fileType: file.mimetype,
        body: file.buffer,
      });

      return await this.photoRepository.create({
        data: {
          title: title,
          imageId,
          albums:
            albumsIds?.length > 0
              ? {
                  create: albumsIds.map((albumId) => ({
                    album: { connect: { id: albumId } },
                  })),
                }
              : undefined,
        },
        include: {
          albums: {
            select: {
              albumId: true,
              photoId: true,
            },
          },
        },
      });
    } catch {
      throw new InternalServerErrorException('Erro ao criar foto');
    }
  }

  async findmany() {
    try {
      const photos = await this.photoRepository.findMany();

      const parsedPhotos = photos.map((photo) => ({
        ...photo,
        albums: photo.albums.map(({ album: { id, title } }) => ({
          id,
          title,
        })),
      }));

      return await this.storage.list(parsedPhotos);
    } catch {
      throw new InternalServerErrorException('Error ao listar fotos!');
    }
  }
}
