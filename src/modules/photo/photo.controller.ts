import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotoService } from './photo.service';
import { PhotoDto } from './dto/photo.dto';

@Controller('photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() data: PhotoDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.photoService.create(data, file);
  }

  @Get()
  listAll(
    @Query('page', new ParseIntPipe({ optional: true })) page = 1,
    @Query('albumId') albumId: string,
    @Query('q') q: string,
  ) {
    return this.photoService.findmany(page, albumId, q);
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.photoService.findById(id);
  }

  @Put('/:id/albums')
  update(@Param('id') id: string, @Body() data: { albumsIds: string[] }) {
    return this.photoService.update({ imageId: id, albumsIds: data.albumsIds });
  }

  @Delete('/:id/:imageId')
  remove(@Param('id') id: string, @Param('id') imageId: string) {
    return this.photoService.delete(id, imageId);
  }
}
