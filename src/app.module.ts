import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { StorageModule } from './storage/storage.module';
import { UploadModule } from './modules/upload/upload.module';
import { EnvModule } from './env/env.module';
import { envSchema } from './env/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    DatabaseModule,
    UploadModule,
    StorageModule,
    EnvModule,
  ],
})
export class AppModule {}
