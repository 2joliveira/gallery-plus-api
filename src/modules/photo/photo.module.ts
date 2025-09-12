import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { StorageModule } from 'src/storage/storage.module';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';

@Module({
  imports: [DatabaseModule, StorageModule],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
