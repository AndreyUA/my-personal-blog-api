import { IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  titleEn: string;

  @IsString()
  contentEn: string;

  @IsString()
  titleUa: string;

  @IsString()
  contentUa: string;

  @IsString()
  titleRu: string;

  @IsString()
  contentRu: string;
}
