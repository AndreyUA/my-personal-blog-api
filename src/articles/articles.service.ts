import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Article } from './models/article.model';
import { CreateArticleDto } from './dto/create-article.dto';
import { Languages } from '../types/languages';
import { CurrentLanguageArticleDto } from './dto/current-language-article.dto';

@Injectable()
export class ArticlesService {
  allowedLanguagesArray: Array<string> = Object.values(Languages);

  constructor(
    @InjectModel(Article)
    private articleModel: typeof Article,
  ) {}

  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  private formatArticles(
    articles: Array<Article>,
    lang: string,
  ): Array<CurrentLanguageArticleDto> {
    return articles.map((article) => ({
      id: article.id,
      title: article[`title${this.capitalizeFirstLetter(lang)}`] as string,
      content: article[`content${this.capitalizeFirstLetter(lang)}`] as string,
      tags: article.tags as Array<string>,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    }));
  }

  private selectedFieldsFromArticle(lang: string): Array<keyof Article> {
    return [
      'id',
      `title${this.capitalizeFirstLetter(lang)}` as keyof Article,
      `content${this.capitalizeFirstLetter(lang)}` as keyof Article,
      'tags',
      'createdAt',
      'updatedAt',
    ];
  }

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
  ): Promise<CurrentLanguageArticleDto> {
    const formattedLanguage = language.toLowerCase();

    if (!this.allowedLanguagesArray.includes(formattedLanguage)) {
      throw new NotFoundException();
    }

    const article = await this.articleModel.findByPk(id, {
      attributes: this.selectedFieldsFromArticle(formattedLanguage),
    });

    if (!article) {
      throw new NotFoundException();
    }

    return this.formatArticles([article], formattedLanguage)[0];
  }

  async getArticlesByLanguage(
    language: string,
  ): Promise<Array<CurrentLanguageArticleDto>> {
    const formattedLanguage = language.toLowerCase();

    if (!this.allowedLanguagesArray.includes(formattedLanguage)) {
      throw new NotFoundException();
    }

    const articles = await this.articleModel.findAll({
      attributes: this.selectedFieldsFromArticle(formattedLanguage),
    });

    return this.formatArticles(articles, formattedLanguage);
  }
}
