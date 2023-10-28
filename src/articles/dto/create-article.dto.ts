import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ArrayMinSize } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({
    description: 'The title of the article on English',
    default: 'English title',
    type: String,
  })
  @IsString()
  titleEn: string;

  @ApiProperty({
    description: 'The content of the article on English',
    default: 'English content',
    type: String,
  })
  @IsString()
  contentEn: string;

  @ApiProperty({
    description: 'The title of the article on Ukrainian',
    default: 'Ukrainian title',
    type: String,
  })
  @IsString()
  titleUa: string;

  @ApiProperty({
    description: 'The content of the article on Ukrainian',
    default: 'Ukrainian content',
    type: String,
  })
  @IsString()
  contentUa: string;

  @ApiProperty({
    description: 'The title of the article on Russian',
    default: 'Russian title',
    type: String,
  })
  @IsString()
  titleRu: string;

  @ApiProperty({
    description: 'The content of the article on Russian',
    default: 'Russian content',
    type: String,
  })
  @IsString()
  contentRu: string;

  @ApiProperty({
    description: 'The array of tags',
    default: ['nodejs', 'express', 'nestjs'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  tags: Array<string>;
}
