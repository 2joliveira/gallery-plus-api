import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { DatabaseModule } from 'src/database/database.module';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [DatabaseModule, StorageModule],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
