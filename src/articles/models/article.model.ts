import { ApiProperty } from '@nestjs/swagger';
import {
  AllowNull,
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
  DataType,
} from 'sequelize-typescript';

@Table
export class Article extends Model {
  @ApiProperty()
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ApiProperty()
  @AllowNull(false)
  @Column
  titleEn: string;

  @ApiProperty()
  @AllowNull(false)
  @Column
  contentEn: string;

  @ApiProperty()
  @AllowNull(false)
  @Column
  titleUa: string;

  @ApiProperty()
  @AllowNull(false)
  @Column
  contentUa: string;

  @ApiProperty()
  @AllowNull(false)
  @Column
  titleRu: string;

  @ApiProperty()
  @AllowNull(false)
  @Column
  contentRu: string;

  @ApiProperty()
  @AllowNull(false)
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  tags: Array<string>;
}
