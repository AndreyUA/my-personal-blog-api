import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Article } from './models/article.model';
import { CreateArticleDto } from './dto/create-article.dto';
import { Languages } from '../types/languages';

@Injectable()
export class ArticlesService {
  allowedLanguagesArray: Array<string> = Object.values(Languages);

  constructor(
    @InjectModel(Article)
    private articleModel: typeof Article,
  ) {}

  async createArticle(articleDto: CreateArticleDto): Promise<Article> {
    const article = await this.articleModel.create({ ...articleDto });

    return article;
  }

  async getArticles(): Promise<Array<Article>> {
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

    if (!article) {
      throw new NotFoundException();
    }

    article.set({ ...articleDto });

    await article.save();

    return article;
  }

  async deleteArticle(id: number): Promise<void> {
    const article = await this.articleModel.findByPk(id);

    if (!article) {
      throw new NotFoundException();
    }

    await article.destroy();
  }

  async getArticleByLanguageAndId(
    language: string,
    id: number,
  ): Promise<Article> {
    const formattedLanguage = language.toLowerCase();

    if (!this.allowedLanguagesArray.includes(formattedLanguage)) {
      throw new NotFoundException();
    }

    const article = await this.articleModel.findByPk(id, {
      attributes: [
        `title${this.capitalizeFirstLetter(formattedLanguage)}`,
        `content${this.capitalizeFirstLetter(formattedLanguage)}`,
        'tags',
      ],
    });

    if (!article) {
      throw new NotFoundException();
    }

    return article;
  }

  async getArticlesByLanguage(language: string): Promise<Array<Article>> {
    const formattedLanguage = language.toLowerCase();

    if (!this.allowedLanguagesArray.includes(formattedLanguage)) {
      throw new NotFoundException();
    }

    const articles = await this.articleModel.findAll({
      attributes: [
        `title${this.capitalizeFirstLetter(formattedLanguage)}`,
        `content${this.capitalizeFirstLetter(formattedLanguage)}`,
        'tags',
      ],
    });

    return articles;
  }

  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
