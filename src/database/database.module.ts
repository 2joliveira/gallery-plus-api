import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PhotoRepository } from './prisma/repositories/photo.repository';

@Module({
  providers: [PrismaService, PhotoRepository],
  exports: [PrismaService, PhotoRepository],
})
export class DatabaseModule {}
