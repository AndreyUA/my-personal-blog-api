import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { Article } from '../articles/models/article.model';

export const sequelizeConfig = (): SequelizeModuleOptions => {
  const partialConfig = {
    dialect: process.env.DB_DIALECT as Dialect,
    models: [Article],
  } as Partial<SequelizeModuleOptions>;

  switch (process.env.NODE_ENV) {
    case 'prod':
    case 'dev': {
      return {
        ...partialConfig,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE_NAME,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        synchronize: false,
        autoLoadModels: false,
      };
    }
    case 'test': {
      return {
        ...partialConfig,
        storage: 'db-test.sqlite',
        synchronize: true,
        autoLoadModels: true,
      };
    }
    default: {
      throw new Error('Invalid NODE_ENV');
    }
  }
};
