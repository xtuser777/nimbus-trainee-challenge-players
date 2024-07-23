import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('bosses', table => {
    table.uuid('id').primary();
    table.string('name', 150).notNullable();
    table
      .enum('difficulty', ['Easy', 'Medium', 'Hard', 'Very Hard'], {
        useNative: true,
        enumName: 'difficulty',
      })
      .notNullable();
    table.timestamps(true, true, false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('bosses');
}
