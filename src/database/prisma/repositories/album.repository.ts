import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import type { Prisma } from '@prisma/client';

@Injectable()
export class AlbumRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.AlbumCreateArgs) {
    return this.prismaService.album.create(createDto);
  }

  findMany() {
    return this.prismaService.album.findMany();
  }

  async findManyWithPhotos(page: number) {
    const limit = 5;
    const skip = (page - 1) * limit;

    const albums = await this.prismaService.album.findMany({
      skip,
      take: limit,
      include: {
        photos: {
          include: {
            photo: true,
          },
        },
      },
    });

    const total = await this.prismaService.album.count();

    return {
      albums,
      hasMore: page * limit < total,
    };
  }

  findUnique(findUniqueDto: Prisma.AlbumWhereUniqueInput) {
    return this.prismaService.album.findUnique({
      where: findUniqueDto,
      include: {
        photos: {
          include: {
            photo: true,
          },
        },
      },
    });
  }

  update(updateDto: Prisma.AlbumUpdateArgs) {
    return this.prismaService.album.update(updateDto);
  }

  delete(deleteDto: Prisma.AlbumWhereUniqueInput) {
    return this.prismaService.album.delete({ where: deleteDto });
  }
}
