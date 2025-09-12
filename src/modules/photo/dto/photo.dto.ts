import { IsArray, IsOptional, IsString } from 'class-validator';

export class PhotoDto {
  @IsString({ message: 'Título é obrigatório' })
  title: string;

  @IsOptional()
  @IsArray()
  albumsIds?: string[];
}
