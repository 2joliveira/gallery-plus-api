import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PhotoOnAlbumRepository {
  constructor(private readonly prismaService: PrismaService) {}

  upsert(imageId: string, albumId: string) {
    return this.prismaService.photoOnAlbum.upsert({
      where: {
        photoId_albumId: { photoId: imageId, albumId },
      },
      create: { photoId: imageId, albumId },
      update: {},
    });
  }

  deleteMany(imageId: string, albumsIds: string[]) {
    return this.prismaService.photoOnAlbum.deleteMany({
      where: {
        photoId: imageId,
        albumId: { notIn: albumsIds },
      },
    });
  }
}
