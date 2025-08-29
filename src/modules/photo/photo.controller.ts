import { Body, Controller, Post } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoDto } from './dto/photo.dto';

@Controller('photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  create(@Body() createPhotoDto: PhotoDto) {
    return this.photoService.create(createPhotoDto);
  }
}
