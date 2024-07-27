import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { PlayerItem } from './entity/player-items.entity';
import { CreatePlayerItemRequestDto } from './dtos/create-player-item-request.dto';
import { DeletePlayerItemRequestDto } from './dtos/delete-player-item-request.dto';
import { PlayersService } from 'src/players/players.service';
import { ItemsService } from 'src/items/items.service';
import { Item } from 'src/items/entity/item.entity';
import { GetAllItemsByPlayerIdResponseDto } from './dtos/get-all-items-by-player-id-response.dto';
import { ItemDto } from 'src/items/dtos/item.dto';
import { CreatePlayerItemResponseDto } from './dtos/create-player-item-response.dto';
import { DeletePlayerItemResponseDto } from './dtos/delete-player-item-response.dto';

const config = require('../../knexfile');

@Injectable()
export class PlayersItemsService {
  private knex: Knex;
  private readonly playersService: PlayersService;
  private readonly itemsService: ItemsService;
  constructor(playersService: PlayersService, itemsService: ItemsService) {
    this.knex = require('knex')(config['development']);
    this.playersService = playersService;
    this.itemsService = itemsService;
  }

  async findAllItemsByPlayerId(playerId: string) {
    try {
      const items = await this.knex<Item>('items')
        .select('*')
        .from('items')
        .innerJoin('players_items as pi', 'pi.item_id', '=', 'items.id')
        .where('pi.player_id', '=', playerId);

      const itemsDto = [];
      items.forEach(item => {
        itemsDto.push(new ItemDto(item));
      });

      return new GetAllItemsByPlayerIdResponseDto(
        200,
        true,
        itemsDto.length,
        itemsDto,
      );
    } catch (e) {
      console.error(e);

      throw new BadRequestException(
        new GetAllItemsByPlayerIdResponseDto(
          400,
          false,
          0,
          [],
          'error retrieving the items.',
        ),
      );
    }
  }

  async save(
    playerId: string,
    itemId: string,
    dto: CreatePlayerItemRequestDto,
  ) {
    try {
      await this.playersService.exists(playerId);
      await this.itemsService.exists(itemId);
      const playerItemDb = await this.knex<PlayerItem>('players_items')
        .select('quantity')
        .where({ player_id: playerId, item_id: itemId })
        .first();
      if (!playerItemDb) {
        const playerItem: PlayerItem = {
          player_id: playerId,
          item_id: itemId,
          quantity: dto.quantity,
          acquired_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        await this.knex('players_items').insert(playerItem);

        return new CreatePlayerItemResponseDto(
          200,
          true,
          'item of player added successfully.',
        );
      } else {
        await this.knex('players_items')
          .update({ quantity: (playerItemDb.quantity += dto.quantity) })
          .where({ player_id: playerId, item_id: itemId });

        return new CreatePlayerItemResponseDto(
          200,
          true,
          'item quantity of player added successfully.',
        );
      }
    } catch (e) {
      console.error(e);

      throw new BadRequestException(
        new CreatePlayerItemResponseDto(
          400,
          false,
          'error adding the item of player.',
        ),
      );
    }
  }

  async delete(
    playerId: string,
    itemId: string,
    dto: DeletePlayerItemRequestDto,
  ) {
    try {
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

      return new DeletePlayerItemResponseDto(
        200,
        true,
        'item of player removed successfully.',
        result,
      );
    } catch (e) {
      console.error(e);

      throw new BadRequestException(
        new DeletePlayerItemResponseDto(
          400,
          false,
          'error removing or decrementing the item of player.',
          0,
        ),
      );
    }
  }
}
