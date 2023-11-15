import type { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

type ConnectionConfig = {
  connection: Knex.Config['connection'];
  client: Knex.Config['client'];
};

type EnviromentConfig = {
  dev: ConnectionConfig;
  prd?: ConnectionConfig;
};

// Update with your config settings.
const envConfig: EnviromentConfig = {
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
