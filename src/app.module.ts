import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { StorageModule } from './storage/storage.module';
import { PhotoModule } from './modules/photo/photo.module';
import { EnvModule } from './env/env.module';
import { envSchema } from './env/env';
import { AlbumModule } from './modules/album/album.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    DatabaseModule,
    PhotoModule,
    AlbumModule,
    StorageModule,
    EnvModule,
  ],
})
export class AppModule {}
