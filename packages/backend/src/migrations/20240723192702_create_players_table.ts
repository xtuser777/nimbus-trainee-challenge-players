import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('players', (table) => {
        table.uuid('id').primary();
        table.string('name', 150).notNullable().unique();
        table.integer('level').notNullable();
        table.enum(
            'class', 
            ['Warrior','Mage','Knight','Cleric','Paladin','Druid','Ranger'], 
            { useNative: true, enumName: "class" }
        ).notNullable();
        table.timestamps(true, true, false);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('players');
}

