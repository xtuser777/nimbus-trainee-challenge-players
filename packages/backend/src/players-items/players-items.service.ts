import { Injectable, NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { PlayerItem } from './entity/player-items.entity';
import { CreatePlayerItemRequestDto } from './dtos/create-player-item-request.dto';
import { DeletePlayerItemRequestDto } from './dtos/delete-player-item-request.dto';

const config = require('../../knexfile');

@Injectable()
export class PlayersItemsService {
  private knex: Knex;
  constructor() {
    this.knex = require('knex')(config['development']);
  }

  async findAllItemsByPlayerId(playerId: string) {
    return await this.knex<PlayerItem>('players_items').where(
      'player_id',
      '=',
      playerId,
    );
  }

  async save(
    playerId: string,
    itemId: string,
    dto: CreatePlayerItemRequestDto,
  ) {
    const playerItem: PlayerItem = {
      player_id: playerId,
      item_id: itemId,
      quantity: dto.quantity,
      acquired_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const result = await this.knex('players_items').insert(playerItem);

    return result;
  }

  async delete(
    playerId: string,
    itemId: string,
    dto: DeletePlayerItemRequestDto,
  ) {
    const playerItem = await this.knex<PlayerItem>('players_items')
      .select('quantity')
      .where({
        player_id: playerId,
        item_id: itemId,
      })
      .first();

    if (!playerItem)
      throw new NotFoundException(
        'association with player and item not found.',
      );

    const newQuantity = playerItem.quantity - dto.quantity;
    let result = undefined;

    if (newQuantity <= 0) {
      result = await this.knex('players_items')
        .where({
          player_id: playerId,
          item_id: itemId,
        })
        .del();
    } else {
      result = await this.knex('players_items')
        .where({
          player_id: playerId,
          item_id: itemId,
        })
        .update({ quantity: newQuantity });
    }

    return result;
  }
}
