import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PhotoRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(page: number, albumId?: string, q?: string) {
    const limit = 10;
    const skip = (page - 1) * limit;

    const photos = await this.prismaService.photo.findMany({
      skip,
      take: limit,
      where: {
        AND: [
          albumId
            ? {
                albums: {
                  some: { albumId },
                },
              }
            : {},
          q
            ? {
                OR: [{ title: { contains: q, mode: 'insensitive' } }],
              }
            : {},
        ],
      },
      include: {
        albums: {
          include: {
            album: true,
          },
        },
      },
    });

    const total = await this.prismaService.photo.count();

    return {
      photos,
      hasMore: page * limit < total,
    };
  }

  findFirst(findFirstDto: Prisma.PhotoFindFirstArgs) {
    return this.prismaService.photo.findFirst(findFirstDto);
  }

  create(createDto: Prisma.PhotoCreateArgs) {
    return this.prismaService.photo.create(createDto);
  }

  update(updateDto: Prisma.PhotoUpdateArgs) {
    return this.prismaService.photo.update(updateDto);
  }

  delete(deleteDto: Prisma.PhotoDeleteArgs) {
    return this.prismaService.photo.delete(deleteDto);
  }
}
