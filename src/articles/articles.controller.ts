import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './models/article.model';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @ApiCreatedResponse({
    description: 'The article has been successfully created.',
    type: Article,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  @Post()
  async createArticle(@Body() createArticleDto: CreateArticleDto) {
    return await this.articlesService.createArticle(createArticleDto);
  }

  @ApiOkResponse({
    description: 'The articles have been successfully retrieved.',
    type: [Article],
  })
  @Get()
  async getArticles() {
    return await this.articlesService.getArticles();
  }

  @Get(':id')
  async getArticle(@Param('id') id: string) {
    return await this.articlesService.getArticle(parseInt(id));
  }

  @Put(':id')
  async updateArticle(
    @Param('id') id: string,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    return await this.articlesService.updateArticle(
      parseInt(id),
      createArticleDto,
    );
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
