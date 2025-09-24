import { IsArray, IsOptional, IsUUID } from 'class-validator';

export class UpdatePhotoDto {
  @IsUUID()
  imageId: string;

  @IsOptional()
  @IsArray()
  albumsIds?: string[];
}
