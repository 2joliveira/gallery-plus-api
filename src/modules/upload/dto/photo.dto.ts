import { IsUrl } from 'class-validator';

export class PhotoDto {
  @IsUrl({}, { message: 'A URL da foto deve ser válida' })
  image: string;
}
