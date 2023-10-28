import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  ArrayMinSize,
  IsNumber,
  IsDate,
} from 'class-validator';

export class CurrentLanguageArticleDto {
  @ApiProperty({
    description: 'The id of the article',
    default: 1,
    type: Number,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'The title of the article on current language',
    default: 'Title',
    type: String,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The content of the article on current language',
    default: 'Content',
    type: String,
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'The array of tags',
    default: ['nodejs', 'express', 'nestjs'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  tags: Array<string>;

  @ApiProperty({
    description: 'The date of creation',
    default: '2020-09-01T00:00:00.000Z',
    type: Date,
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'The date of update',
    default: '2020-09-01T00:00:00.000Z',
    type: Date,
  })
  @IsDate()
  updatedAt: Date;
}
