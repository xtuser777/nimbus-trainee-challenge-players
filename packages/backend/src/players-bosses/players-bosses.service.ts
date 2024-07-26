import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { PlayerBoss } from './entity/player-boss.entity';
import { PlayersService } from 'src/players/players.service';
import { CreatePlayerBossResponseDto } from './dtos/create-player-boss-response.dto';
import { Boss } from 'src/bosses/entity/boss.entity';
import { GetAllBossesByPlayerIdResponseDto } from './dtos/get-all-bosses-by-player-id-response.dto';
import { BossDto } from 'src/bosses/dtos/boss.dto';

const config = require('../../knexfile');

@Injectable()
export class PlayersBossesService {
  private knex: Knex;
  private readonly playersService: PlayersService;
  constructor(playersService: PlayersService) {
    this.knex = require('knex')(config['development']);
    this.playersService = playersService;
  }

  async findAllBossesByPlayerId(playerId: string) {
    try {
      const bosses = await this.knex<Boss>('bosses')
        .select('*')
        .from('bosses')
        .innerJoin('players_bosses as pb', 'pb.boss_id', '=', 'bosses.id')
        .where('pb.player_id', '=', playerId);
      const bossesDto = [];
      bosses.forEach(boss => {
        bossesDto.push(new BossDto(boss));
      });

      return new GetAllBossesByPlayerIdResponseDto(
        200,
        true,
        bossesDto.length,
        bossesDto,
      );
    } catch (e) {
      console.error(e);

      return new GetAllBossesByPlayerIdResponseDto(
        400,
        false,
        0,
        [],
        'error retrieving the bosses.',
      );
    }
  }

  async save(playerId: string, bossId: string) {
    try {
      await this.playersService.exists(playerId);
      const playerBoss: PlayerBoss = {
        player_id: playerId,
        boss_id: bossId,
        defeated_at: new Date().toISOString(),
      };
      await this.knex('players_bosses').insert(playerBoss);

      return new CreatePlayerBossResponseDto(
        201,
        true,
        'player and boss defeated created successfully.',
      );
    } catch (e) {
      console.error(e);

      return new CreatePlayerBossResponseDto(
        400,
        false,
        'error adding the defeat of boss.',
      );
    }
  }
}
