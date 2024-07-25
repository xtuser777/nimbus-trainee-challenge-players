import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { PlayerBoss } from './entity/player-boss.entity';

const config = require('../../knexfile');

@Injectable()
export class PlayersBossesService {
  private knex: Knex;
  constructor() {
    this.knex = require('knex')(config['development']);
  }

  async findAllBossesByPlayerId(playerId: string) {
    return await this.knex<PlayerBoss>('players_bosses').where("player_id", "=", playerId);
  }

  async save(playerId: string, bossId: string) {
    const playerBoss: PlayerBoss = {
      player_id: playerId,
      boss_id: bossId,
      defeated_at: new Date().toISOString(),
    };

    const result = await this.knex('players_bosses').insert(playerBoss);

    return result;
  }
}
