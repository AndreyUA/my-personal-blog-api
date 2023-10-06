import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { Article } from './models/article.model';

@Module({
  providers: [ArticlesService],
  controllers: [ArticlesController],
  imports: [SequelizeModule.forFeature([Article])],
  exports: [ArticlesService],
})
export class ArticlesModule {}
