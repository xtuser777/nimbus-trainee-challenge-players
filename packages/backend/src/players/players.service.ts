import { Injectable, NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { Player } from './entity/player.entity';
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

  async findOne(id:string) {
    const player = await this.knex<Player>('players').where("id", id).first();
    if (!player) throw new NotFoundException('player with this id not found');
    return player;
  }
}
