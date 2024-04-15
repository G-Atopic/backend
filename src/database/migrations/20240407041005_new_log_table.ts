import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('log', (table) => {
    table.increments('id');
    table.string('method', 255).notNullable();
    table.string('success', 255).notNullable();
    table.string('fullUrl', 255).notNullable();
    table.string('path', 255).notNullable();
    table.string('userAgent', 255).notNullable();
    table.string('authorization', 255).notNullable();
    table.string('contentLength', 255).notNullable();
    table.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('log');
}
