import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { Item } from './entity/item.entity';
import { randomUUID } from 'node:crypto';
import { CreateItemRequestDto } from './dtos/create-item-request.dto';
import { UpdateItemRequestDto } from './dtos/update-item-request.dto';
import { ItemDto } from './dtos/item.dto';
import { GetAllItemsResponseDto } from './dtos/get-all-items-response.dto';
import { GetOneItemResponseDto } from './dtos/get-one-item-response.dto';
import { CreateItemResponseDto } from './dtos/create-item-response.dto';
import { UpdateItemResponseDto } from './dtos/update-item-response.dto';
import { DeleteItemResponseDto } from './dtos/delete-item-response.dto';

const config = require('../../knexfile');

@Injectable()
export class ItemsService {
  private knex: Knex;
  constructor() {
    this.knex = require('knex')(config['development']);
  }

  async findAll() {
    try {
      const items = await this.knex<Item>('items');
      const itemsDto = [];
      items.forEach(item => {
        itemsDto.push(new ItemDto(item));
      });

      return new GetAllItemsResponseDto(200, true, itemsDto, itemsDto.length);
    } catch (e) {
      console.error(e);

      throw new BadRequestException(
        new GetAllItemsResponseDto(400, false, [], 0, 'error returning items.'),
      );
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.knex<Item>('items').where('id', id).first();
      if (!item) throw new NotFoundException('item with this id not found');

      return new GetOneItemResponseDto(200, true, new ItemDto(item));
    } catch (e) {
      console.error(e);

      throw new BadRequestException(
        new GetOneItemResponseDto(
          400,
          false,
          undefined,
          'error returning item.',
        ),
      );
    }
  }

  async save(dto: CreateItemRequestDto) {
    try {
      await this.nameExists(dto.name, 'create');
      const item: Item = {
        id: randomUUID(),
        ...dto,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      await this.knex('items').insert(item);

      return new CreateItemResponseDto(201, true, 'item created successfully.');
    } catch (e) {
      console.error(e);

      throw new BadRequestException(
        new CreateItemResponseDto(400, false, 'error creating item.'),
      );
    }
  }

  async update(id: string, dto: UpdateItemRequestDto) {
    try {
      await this.exists(id);
      await this.nameExists(dto.name, 'update');
      const result = await this.knex('items')
        .update({ ...dto })
        .where({ id });

      return new UpdateItemResponseDto(
        200,
        false,
        'item updated successfully.',
        result,
      );
    } catch (e) {
      console.error(e);

      throw new BadRequestException(
        new UpdateItemResponseDto(400, false, 'error updating item.', 0),
      );
    }
  }

  async delete(id: string) {
    try {
      await this.exists(id);
      const row = await this.knex('players_items')
        .count('*')
        .where({ item_id: id });
      if (row['count'] > 0)
        throw new BadRequestException(
          new DeleteItemResponseDto(
            400,
            false,
            'item owned by one or more players.',
            0,
          ),
        );
      const result = await this.knex('items').where({ id }).del();

      return new DeleteItemResponseDto(
        200,
        true,
        'item removed successfully.',
        result,
      );
    } catch (e) {
      console.error(e);

      throw new BadRequestException(
        new DeleteItemResponseDto(400, false, 'error removing item.', 0),
      );
    }
  }

  async exists(id: string) {
    const result = await this.knex('items').select('id').where({ id }).first();

    if (!result) throw new NotFoundException('item not found.');
  }

  async nameExists(name: string, type: string) {
    const result = await this.knex('items')
      .count('names')
      .from('items')
      .where('name', '=', name);

    if (result['count'] > 0)
      throw new BadRequestException(
        type === 'create'
          ? new CreateItemResponseDto(
              400,
              false,
              'this name already exists in database.',
            )
          : new UpdateItemResponseDto(
              400,
              false,
              'this name already exists in database.',
              0,
            ),
      );
  }
}
