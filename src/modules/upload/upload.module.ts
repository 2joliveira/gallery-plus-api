import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { StorageModule } from 'src/storage/storage.module';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [DatabaseModule, StorageModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
