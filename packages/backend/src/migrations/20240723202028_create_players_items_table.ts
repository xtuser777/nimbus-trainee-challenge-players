import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('players_items', table => {
    table.uuid('player_id').notNullable();
    table.foreign('player_id').references('players.id').onDelete('CASCADE').onUpdate('CASCADE');
    table.uuid('item_id').notNullable();
    table.foreign('item_id').references('items.id').onDelete('CASCADE').onUpdate('CASCADE');
    table.integer('quantity').notNullable();
    table.datetime('acquired_at').notNullable();
    table.datetime('updated_at').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('players_items');
}
