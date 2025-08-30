import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
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
    return this.photoService.create(file);
  }
}
