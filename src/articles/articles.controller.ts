import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Post()
  async createArticle() {
    return await this.articlesService.createArticle();
  }

  @Get()
  async getArticles() {
    return await this.articlesService.getArticles();
  }

  @Get(':id')
  async getArticle(@Param('id') id: string) {
    return await this.articlesService.getArticle(parseInt(id));
  }

  @Put(':id')
  async updateArticle(@Param('id') id: string, @Body() data: any) {
    return await this.articlesService.updateArticle(parseInt(id), data);
  }

  @Delete(':id')
  async deleteArticle(@Param('id') id: string) {
    return await this.articlesService.deleteArticle(parseInt(id));
  }

  @Get('/lang/:language')
  async getArticlesByLanguage(@Param('language') language: string) {
    return await this.articlesService.getArticlesByLanguage(language);
  }

  @Get('/lang/:language/:id')
  async getArticleByLanguageAndId(
    @Param('language') language: string,
    @Param('id') id: string,
  ) {
    return await this.articlesService.getArticleByLanguageAndId(
      language,
      parseInt(id),
    );
  }
}
