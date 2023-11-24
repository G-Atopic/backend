import type { Knex } from 'knex';
import dotenv from 'dotenv';
import { KnexType } from './src/types';

dotenv.config();

// Update with your config settings.
const envConfig: KnexType.EnviromentConfig = {
  dev: {
    client: 'sqlite3',
    connection: { filename: './src/database/dev.sqlite3' },
  },
};
const enviroment = (process.env.ENV || 'dev') as keyof typeof envConfig;

const config: Knex.Config = {
  ...envConfig[enviroment],
  migrations: {
    directory: 'src/database/migrations',
    tableName: 'knex_migrations',
  },
  useNullAsDefault: true,
};
// prd: {
//   client: 'postgresql',
//   connection: '',
//   migrations: {
//     tableName: 'knex_migrations',
//   },
//   ...comumConfigs,
// },

export default config;
