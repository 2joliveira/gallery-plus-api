import { Module } from '@nestjs/common';
import { EnvModule } from 'src/env/env.module';
import { B2Storage } from './b2-storage';

@Module({
  imports: [EnvModule],
  providers: [B2Storage],
  exports: [B2Storage],
})
export class StorageModule {}
