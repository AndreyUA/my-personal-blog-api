import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Article } from './models/article.model';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article)
    private articleModel: typeof Article,
  ) {}

  async createArticle(): Promise<Article> {
    const article = await this.articleModel.create({
      titleEn: 'English title',
      contentEn: 'English content',
      titleUa: 'Ukrainian title',
      contentUa: 'Ukrainian content',
      titleRu: 'Russian title',
      contentRu: 'Russian content',
    });

    return article;
  }
}
