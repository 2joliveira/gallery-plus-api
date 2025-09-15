import { IsString, IsOptional, IsArray, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsArray()
  @IsUUID()
  photosIds?: string[];
}
