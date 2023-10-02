import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Article extends Model {
  @Column
  titleEn: string;

  @Column
  contentEn: string;

  @Column
  titleUa: string;

  @Column
  contentUa: string;

  @Column
  titleRu: string;

  @Column
  contentRu: string;
}
