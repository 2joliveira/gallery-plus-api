import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PhotoRepository } from './prisma/repositories/photo.repository';
import { AlbumRepository } from './prisma/repositories/album.repository';

@Module({
  providers: [PrismaService, PhotoRepository, AlbumRepository],
  exports: [PrismaService, PhotoRepository, AlbumRepository],
})
export class DatabaseModule {}
