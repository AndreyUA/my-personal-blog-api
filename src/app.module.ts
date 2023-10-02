import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  SequelizeModule,
  SequelizeModuleAsyncOptions,
} from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import * as Joi from 'joi';

import { ArticlesModule } from './articles/articles.module';
import { Article } from './articles/models/article.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
        PORT: Joi.number().required(),
        DB_DIALECT: Joi.string()
          .valid(
            'mysql',
            'postgres',
            'sqlite',
            'mariadb',
            'mssql',
            'db2',
            'oracle',
            'snowflake',
          )
          .required(),
      }),
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: config.get<Dialect>('DB_DIALECT'),
        storage: 'db-test.sqlite',
        models: [Article],
        synchronize: true,
        autoLoadModels: true,
      }),
    } as SequelizeModuleAsyncOptions),
    ArticlesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
