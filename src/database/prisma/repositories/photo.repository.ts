import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PhotoRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findMany() {
    return this.prismaService.photo.findMany({
      include: {
        albums: {
          include: {
            album: true,
          },
        },
      },
    });
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
