import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './models/article.model';
import { CurrentLanguageArticleDto } from './dto/current-language-article.dto';

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
  async createArticle(
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    return await this.articlesService.createArticle(createArticleDto);
  }

  @ApiOkResponse({
    description: 'The articles have been successfully retrieved.',
    type: [Article],
  })
  @Get()
  async getArticles(): Promise<Array<Article>> {
    return await this.articlesService.getArticles();
  }

  @ApiOkResponse({
    description: 'The article has been successfully retrieved.',
    type: Article,
  })
  @ApiNotFoundResponse({
    description: 'Article not found.',
  })
  @Get(':id')
  async getArticle(@Param('id') id: string): Promise<Article> {
    return await this.articlesService.getArticle(parseInt(id));
  }

  @ApiOkResponse({
    description: 'The article has been successfully updated.',
    type: Article,
  })
  @ApiNotFoundResponse({
    description: 'Article not found.',
  })
  @Put(':id')
  async updateArticle(
    @Param('id') id: string,
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    return await this.articlesService.updateArticle(
      parseInt(id),
      createArticleDto,
    );
  }

  @ApiNoContentResponse({
    description: 'The article has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'Article not found.',
  })
  @Delete(':id')
  @HttpCode(204)
  async deleteArticle(@Param('id') id: string): Promise<void> {
    return await this.articlesService.deleteArticle(parseInt(id));
  }

  @ApiOkResponse({
    description: 'The articles have been successfully retrieved.',
    type: [CurrentLanguageArticleDto],
  })
  @ApiNotFoundResponse({
    description: 'Articles not found.',
  })
  @Get('/lang/:language')
  async getArticlesByLanguage(
    @Param('language') language: string,
  ): Promise<Array<CurrentLanguageArticleDto>> {
    return await this.articlesService.getArticlesByLanguage(language);
  }

  @ApiOkResponse({
    description: 'The article has been successfully retrieved.',
    type: CurrentLanguageArticleDto,
  })
  @ApiNotFoundResponse({
    description: 'Articles not found.',
  })
  @Get('/lang/:language/:id')
  async getArticleByLanguageAndId(
    @Param('language') language: string,
    @Param('id') id: string,
  ): Promise<CurrentLanguageArticleDto> {
    return await this.articlesService.getArticleByLanguageAndId(
      language,
      parseInt(id),
    );
  }
}
