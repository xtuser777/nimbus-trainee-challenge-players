import { Injectable, NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { Player } from './entity/player.entity';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { randomUUID } from 'crypto';
import { UpdatePlayerDto } from './dtos/update-player.dto';

const config = require('../../knexfile');

@Injectable()
export class PlayersService {
  private knex: Knex;
  constructor() {
    this.knex = require('knex')(config['development']);
  }

  async findAll() {
    return await this.knex<Player>('players');
  }

  async findOne(id: string) {
    const player = await this.knex<Player>('players').where('id', id).first();
    if (!player) throw new NotFoundException('player with this id not found');
    return player;
  }

  async save(dto: CreatePlayerDto) {
    const player: Player = {
      id: randomUUID(),
      ...dto,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const result = await this.knex('players').insert(player);

    return result;
  }

  async update(id: string, dto: UpdatePlayerDto) {
    const player = await this.findOne(id);
    player.name = dto.name;
    player.class = dto.class;
    const result = await this.knex('players').update(player);
    return result;
  }

  async levelUp(id: string) {
    const player = await this.findOne(id);
    const result = await this.knex('players').update({ level: player.level + 1 }).where("id", id);
    return result;
  }

  async delete(id: string) {
    const player = await this.findOne(id);
    const result = await this.knex('players').where({ id }).del();
    return result;
  }
}
