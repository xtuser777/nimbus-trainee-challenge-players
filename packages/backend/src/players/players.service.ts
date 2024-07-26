import { Injectable, NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { Player } from './entity/player.entity';
import { CreatePlayerRequestDto } from './dtos/create-player-request.dto';
import { randomUUID } from 'crypto';
import { UpdatePlayerRequestDto } from './dtos/update-player-request.dto';
import { GetAllPlayersResponseDto } from './dtos/get-all-players-response.dto';
import { PlayerDto } from './dtos/player.dto';
import { GetOnePlayerResponseDto } from './dtos/get-one-player-response.dto';
import { CreatePlayerResponseDto } from './dtos/create-player-response.dto';
import { UpdatePlayerResponseDto } from './dtos/update-player-response.dto';
import { DeletePlayerResponseDto } from './dtos/delete-player-response.dto';

const config = require('../../knexfile');

@Injectable()
export class PlayersService {
  private knex: Knex;
  constructor() {
    this.knex = require('knex')(config['development']);
  }

  async findAll() {
    try {
      const players = await this.knex<Player>('players');

      const playersDto = [];

      players.forEach(players => {
        playersDto.push(new PlayerDto(players));
      });

      return new GetAllPlayersResponseDto(
        200,
        true,
        players.length,
        playersDto,
      );
    } catch (e) {
      console.error(e);

      return new GetAllPlayersResponseDto(400, false, 0, undefined);
    }
  }

  async findOne(id: string) {
    try {
      const player = await this.knex<Player>('players').where('id', id).first();
      if (!player)
        throw new NotFoundException(
          new GetOnePlayerResponseDto(
            404,
            false,
            undefined,
            'player with this id not found',
          ),
        );

      return new GetOnePlayerResponseDto(200, true, new PlayerDto(player));
    } catch (e) {
      console.error(e);

      return new GetOnePlayerResponseDto(
        400,
        false,
        undefined,
        'error returning the players.',
      );
    }
  }

  async save(dto: CreatePlayerRequestDto) {
    try {
      const player: Player = {
        id: randomUUID(),
        ...dto,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await this.knex('players').insert(player);

      return new CreatePlayerResponseDto(
        201,
        true,
        'player added successfully.',
      );
    } catch (e) {
      console.error(e);

      return new CreatePlayerResponseDto(
        400,
        false,
        'error adding the player.',
      );
    }
  }

  async update(id: string, dto: UpdatePlayerRequestDto) {
    try {
      await this.exists(id);
      const result = await this.knex('players')
        .update({ ...dto })
        .where('id', id);

      return new UpdatePlayerResponseDto(
        200,
        true,
        'player updated successfully.',
        result,
      );
    } catch (e) {
      console.error(e);

      return new UpdatePlayerResponseDto(
        400,
        false,
        'error updating player',
        0,
      );
    }
  }

  async levelUp(id: string) {
    try {
      const player = await this.findOne(id);
      const result = await this.knex('players')
        .update({ level: player.data.level + 1 })
        .where('id', id);

      return new UpdatePlayerResponseDto(
        200,
        true,
        'level up player successfully.',
        result,
      );
    } catch (e) {
      console.error(e);

      return new UpdatePlayerResponseDto(
        400,
        false,
        'error level upping player',
        0,
      );
    }
  }

  async delete(id: string) {
    try {
      await this.exists(id);
      const result = await this.knex('players').where({ id }).del();

      return new DeletePlayerResponseDto(
        200,
        true,
        'remove player successfully.',
        result,
      );
    } catch (e) {
      console.error(e);

      return new DeletePlayerResponseDto(
        400,
        false,
        'error removing player',
        0,
      );
    }
  }

  async exists(id: string) {
    const result = await this.knex('players')
      .select('id')
      .where({ id })
      .first();

    if (!result) throw new NotFoundException('player not found.');
  }
}
