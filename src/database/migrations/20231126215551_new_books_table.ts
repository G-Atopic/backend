import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('books', (table) => {
    table.uuid('id');
    table.string('name', 255).notNullable();

    table
      .text('description')
      .notNullable()
      .defaultTo('Author has not provided a description');
    table.mediumint('totalViews').notNullable().defaultTo(0);
    table.mediumint('favorites').notNullable().defaultTo(0);
    table.tinyint('rating').notNullable().defaultTo(5);
    table.mediumint('ratingTotal').notNullable().defaultTo(5);
    table.mediumint('pages').notNullable().defaultTo(0);
    table
      .string('photo')
      .notNullable()
      .defaultTo(
        'https://www.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg',
      );
    table.integer('authorId').notNullable();
    table.foreign('authorId').references('id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('books');
}
