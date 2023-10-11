import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { Article } from '../articles/models/article.model';
import pg from 'pg';

export const sequelizeConfig = (): SequelizeModuleOptions => {
  const partialBaseConfig = {
    dialect: process.env.DB_DIALECT as Dialect,
    models: [Article],
  } as Partial<SequelizeModuleOptions>;

  const partialCoreConfig = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    synchronize: false,
    autoLoadModels: false,
  } as Partial<SequelizeModuleOptions>;

  switch (process.env.NODE_ENV) {
    case 'prod': {
      return {
        ...partialBaseConfig,
        ...partialCoreConfig,
        ssl: true,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        dialectModule: pg,
      };
    }
    case 'dev': {
      return {
        ...partialBaseConfig,
        ...partialCoreConfig,
      };
    }
    case 'test': {
      return {
        ...partialBaseConfig,
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
