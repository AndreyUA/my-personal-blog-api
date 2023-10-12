import { Injectable, NotFoundException } from '@nestjs/common';
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

    if (!article) {
      throw new NotFoundException();
    }

    return article;
  }

  async updateArticle(
    id: number,
    articleDto: CreateArticleDto,
  ): Promise<Article> {
    const article = await this.articleModel.findByPk(id);
    article.set({ ...articleDto });

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
        'tags',
      ],
    });

    return article;
  }

  async getArticlesByLanguage(language: string): Promise<Article[]> {
    const articles = await this.articleModel.findAll({
      attributes: [
        `title${this.capitalizeFirstLetter(language)}`,
        `content${this.capitalizeFirstLetter(language)}`,
        'tags',
      ],
    });

    return articles;
  }

  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
