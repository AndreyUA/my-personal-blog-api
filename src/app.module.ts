import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import * as Joi from 'joi';

import { ArticlesModule } from './articles/articles.module';
import { sequelizeConfig } from './configs/sequelizeConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE_NAME: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        PORT: Joi.string().required(),
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
    SequelizeModule.forRoot(sequelizeConfig()),
    ArticlesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
