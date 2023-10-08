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
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  titleEn: string;

  @AllowNull(false)
  @Column
  contentEn: string;

  @AllowNull(false)
  @Column
  titleUa: string;

  @AllowNull(false)
  @Column
  contentUa: string;

  @AllowNull(false)
  @Column
  titleRu: string;

  @AllowNull(false)
  @Column
  contentRu: string;

  @AllowNull(false)
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  tags: Array<string>;
}
