import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('books', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description');
    table.date('published_date').notNullable();
    table.integer('author_id').unsigned().notNullable();
    table.timestamps(true, true);

    table
      .foreign('author_id')
      .references('id')
      .inTable('authors')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('books');
}
