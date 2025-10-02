import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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

  @Get('/photos')
  async listAllWithPhotos(
    @Query('pageAlbums', new ParseIntPipe({ optional: true })) page = 1,
  ) {
    return await this.albumService.findManyWithPhotos(page);
  }

  @Get('/:id')
  async finById(@Param('id') id: string) {
    return await this.albumService.finById(id);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() dto: CreateAlbumDto) {
    return await this.albumService.update(id, dto.title);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.albumService.remove(id);
  }
}
