import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PhotoModule } from './modules/photo/photo.module';

@Module({
  imports: [DatabaseModule, PhotoModule],
})
export class AppModule {}
