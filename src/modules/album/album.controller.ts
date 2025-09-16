import { Body, Controller, Get, Post } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  async create(@Body() dto: CreateAlbumDto) {
    return await this.albumService.create(dto);
  }

  @Get()
  async listAll() {
    return await this.albumService.findMany();
  }
}
