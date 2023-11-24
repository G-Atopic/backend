import { Knex } from 'knex';

export type ConnectionConfig = {
  connection: Knex.Config['connection'];
  client: Knex.Config['client'];
};

export type EnviromentConfig = {
  dev: ConnectionConfig;
  prd?: ConnectionConfig;
};
