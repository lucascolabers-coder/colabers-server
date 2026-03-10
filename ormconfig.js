const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const fileExtension = isProduction ? 'js' : 'ts';
const rootDir = isProduction ? 'dist' : 'src';

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'docker',
  database: process.env.DB_DATABASE || 'colabers',
  entities: [path.resolve(__dirname, `${rootDir}/modules/**/typeorm/entities/*.${fileExtension}`)],
  migrations: [path.resolve(__dirname, `${rootDir}/shared/typeorm/migrations/*.${fileExtension}`)],
  cli: {
    migrationsDir: './src/shared/typeorm/migrations',
  },
};
