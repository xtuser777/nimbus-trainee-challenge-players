import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('items', table => {
    table.uuid('id').primary();
    table.string('name', 150).notNullable();
    table.string('description', 150).notNullable();
    table
      .enum('type', ['Weapon', 'Armor', 'Consumable'], {
        useNative: true,
        enumName: 'item_type',
      })
      .notNullable();

    table
      .enum('rarity', ['Common', 'Uncommon', 'Rare', 'Legendary'], {
        useNative: true,
        enumName: 'item_rarity',
      })
      .notNullable();
    table.timestamps(true, true, false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('items');
}
