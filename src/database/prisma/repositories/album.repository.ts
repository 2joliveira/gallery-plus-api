import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import type { Prisma } from '@prisma/client';

@Injectable()
export class AlbumRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.AlbumCreateArgs) {
    return this.prismaService.album.create(createDto);
  }
}
