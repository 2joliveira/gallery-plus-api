import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PhotoRepository } from './prisma/repositories/photo.repository';
import { AlbumRepository } from './prisma/repositories/album.repository';
import { PhotoOnAlbumRepository } from './prisma/repositories/photoOnAlbum.repository';

@Module({
  providers: [
    PrismaService,
    PhotoRepository,
    AlbumRepository,
    PhotoOnAlbumRepository,
  ],
  exports: [
    PrismaService,
    PhotoRepository,
    AlbumRepository,
    PhotoOnAlbumRepository,
  ],
})
export class DatabaseModule {}
