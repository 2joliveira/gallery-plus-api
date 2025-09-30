import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { DatabaseModule } from 'src/database/database.module';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [DatabaseModule, StorageModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
