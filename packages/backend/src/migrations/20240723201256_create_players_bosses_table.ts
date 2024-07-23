import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('players_bosses', table => {
    table.uuid('player_id').notNullable();
    table.foreign('player_id').references('players.id').onDelete('CASCADE').onUpdate('CASCADE');
    table.uuid('boss_id').notNullable();
    table.foreign('boss_id').references('bosses.id').onDelete('CASCADE').onUpdate('CASCADE');
    table.date('defeated_at').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('players_bosses');
}
