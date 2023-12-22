import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('books', (table) => {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.string('description').defaultTo('');
    table
      .string('photo')
      .notNullable()
      .defaultTo(
        'https://www.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg',
      );
    table.integer('authorId').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('books');
}
