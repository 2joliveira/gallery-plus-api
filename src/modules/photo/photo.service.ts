import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PhotoRepository } from 'src/database/prisma/repositories/photo.repository';
import { B2Storage } from 'src/storage/b2-storage';
import { PhotoDto } from './dto/photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { PhotoOnAlbumRepository } from 'src/database/prisma/repositories/photoOnAlbum.repository';

@Injectable()
export class PhotoService {
  constructor(
    private readonly photoRepository: PhotoRepository,
    private readonly photoOnAlbumRepository: PhotoOnAlbumRepository,
    private storage: B2Storage,
  ) {}

  async create({ title, albumsIds = [] }: PhotoDto, file: Express.Multer.File) {
    try {
      const { imageId } = await this.storage.upload({
        fileName: title,
        fileType: file.mimetype,
        body: file.buffer,
      });

      const photo = await this.photoRepository.create({
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

      return await this.storage.list([photo]);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Erro ao criar foto!');
    }
  }

  async findmany(page: number, albumId?: string, q?: string) {
    try {
      const { photos, hasMore, total } = await this.photoRepository.findMany(
        page,
        albumId,
        q,
      );

      const parsedPhotos = photos.map((photo) => ({
        ...photo,
        albums: photo.albums.map(({ album: { id, title } }) => ({
          id,
          title,
        })),
      }));

      const photosWithUrl = await this.storage.list(parsedPhotos);

      return {
        photos: photosWithUrl,
        hasMore,
        total,
      };
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Error ao listar fotos!');
    }
  }

  async findById(photoId: string) {
    try {
      const { photo, previous, next } = await this.photoRepository.findUnique({
        id: photoId,
      });

      if (!photo) return;

      const parsedPhotos = [photo].map((photo) => ({
        ...photo,
        albums: photo.albums.map(({ album: { id, title } }) => ({
          id,
          title,
        })),
      }));

      const photosWithUrl = await this.storage.list(parsedPhotos);

      return {
        ...photosWithUrl[0],
        nextPhotoId: next?.id || null,
        previousPhotoId: previous?.id || null,
      };
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Erro ao buscar foto!');
    }
  }

  async update({ imageId, albumsIds = [] }: UpdatePhotoDto) {
    try {
      await Promise.all(
        albumsIds.map((albumId) =>
          this.photoOnAlbumRepository.upsert(imageId, albumId),
        ),
      );

      return await this.photoOnAlbumRepository.deleteMany(imageId, albumsIds);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Erro ao atualizar foto!');
    }
  }

  async delete(photoId: string, imageId: string) {
    try {
      await this.storage.delete(imageId);

      await this.photoOnAlbumRepository.deleteMany(photoId);

      return await this.photoRepository.delete({ where: { id: photoId } });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Erro ao deletar foto!');
    }
  }
}
