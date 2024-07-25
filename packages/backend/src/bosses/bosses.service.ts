import { Injectable, NotFoundException } from "@nestjs/common";
import { Knex } from "knex";
import { Boss } from "./entity/boss.entity";
import { randomUUID } from "node:crypto";
import { CreateBossDto } from "./dtos/create-boss.dto";
import { UpdateBossDto } from "./dtos/update-boss.dto";

const config = require('../../knexfile');

@Injectable()
export class BossesService {
  private knex: Knex;
  constructor() {
    this.knex = require('knex')(config['development']);
  }

  async findAll() {
    return await this.knex<Boss>('bosses');
  }

  async findOne(id: string) {
    const boss = await this.knex<Boss>('bosses').where('id', id).first();
    if (!boss) throw new NotFoundException('boss with this id not found');
    return boss;
  }

  async save(dto: CreateBossDto) {
    const boss: Boss = {
      id: randomUUID(),
      ...dto,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const result = await this.knex('bosses').insert(boss);

    return result;
  }

  async update(id: string, dto: UpdateBossDto) {
    const boss = await this.findOne(id);
    boss.name = dto.name;
    boss.difficulty = dto.difficulty;
    const result = await this.knex('bosses').update(boss);
    return result;
  }

  async delete(id: string) {
    const boss = await this.findOne(id);
    const result = await this.knex('bosses').where({ id }).del();
    return result;
  }
}
