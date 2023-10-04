const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = {
  dev: {
    dialect: process.env.DB_DIALECT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
  prod: {
    dialect: process.env.DB_DIALECT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
};
