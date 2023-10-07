import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Article } from './models/article.model';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article)
    private articleModel: typeof Article,
  ) {}

  async createArticle(articleDto: CreateArticleDto): Promise<Article> {
    const article = await this.articleModel.create({ ...articleDto });

    return article;
  }

  async getArticles(): Promise<Article[]> {
    const articles = await this.articleModel.findAll();

    return articles;
  }

  async getArticle(id: number): Promise<Article> {
    const article = await this.articleModel.findByPk(id);

    return article;
  }

  async updateArticle(id: number, data: any): Promise<Article> {
    const article = await this.articleModel.findByPk(id);
    article.titleEn = data.titleEn;
    article.contentEn = data.contentEn;
    article.titleUa = data.titleUa;
    article.contentUa = data.contentUa;
    article.titleRu = data.titleRu;
    article.contentRu = data.contentRu;
    await article.save();

    return article;
  }

  async deleteArticle(id: number): Promise<Article> {
    const article = await this.articleModel.findByPk(id);
    await article.destroy();

    return article;
  }

  async getArticleByLanguageAndId(
    language: string,
    id: number,
  ): Promise<Article> {
    const article = await this.articleModel.findByPk(id, {
      attributes: [
        `title${this.capitalizeFirstLetter(language)}`,
        `content${this.capitalizeFirstLetter(language)}`,
      ],
    });

    return article;
  }

  async getArticlesByLanguage(language: string): Promise<Article[]> {
    const articles = await this.articleModel.findAll({
      attributes: [
        `title${this.capitalizeFirstLetter(language)}`,
        `content${this.capitalizeFirstLetter(language)}`,
      ],
    });

    return articles;
  }

  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
