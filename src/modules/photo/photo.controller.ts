import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  ParseIntPipe,
  Post,
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
}
