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
    case 'dev':
    case 'test': {
      return {
        ...partialConfig,
        storage: 'db-test.sqlite',
        synchronize: true,
      };
    }
    default: {
      throw new Error('Invalid NODE_ENV');
    }
  }
};
