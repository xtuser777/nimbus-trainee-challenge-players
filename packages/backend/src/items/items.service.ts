import { Injectable, NotFoundException } from "@nestjs/common";
import { Knex } from "knex";
import { Item } from "./entity/item.entity";
import { randomUUID } from "node:crypto";
import { CreateItemDto } from "./dtos/create-item.dto";
import { UpdateItemDto } from "./dtos/update-item.dto";

const config = require('../../knexfile');

@Injectable()
export class ItemsService {
  private knex: Knex;
  constructor() {
    this.knex = require('knex')(config['development']);
  }

  async findAll() {
    return await this.knex<Item>('items');
  }

  async findOne(id: string) {
    const item = await this.knex<Item>('items').where('id', id).first();
    if (!item) throw new NotFoundException('item with this id not found');
    return item;
  }

  async save(dto: CreateItemDto) {
    const item: Item = {
      id: randomUUID(),
      ...dto,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const result = await this.knex('items').insert(item);

    return result;
  }

  async update(id: string, dto: UpdateItemDto) {
    const item = await this.findOne(id);
    item.name = dto.name;
    item.description = dto.description;
    item.type = dto.type;
    item.rarity = dto.rarity;
    const result = await this.knex('items').update(item);
    return result;
  }

  async delete(id: string) {
    const item = await this.findOne(id);
    const result = await this.knex('items').where({ id }).del();
    return result;
  }
}
