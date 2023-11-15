import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('email', 255).notNullable().unique();
    table.string('password').notNullable();
    table.string('photo');
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('users');
}
