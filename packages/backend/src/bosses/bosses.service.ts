import { Injectable, NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { Boss } from './entity/boss.entity';
import { randomUUID } from 'node:crypto';
import { CreateBossRequestDto } from './dtos/create-boss-request.dto';
import { UpdateBossRequestDto } from './dtos/update-boss-request.dto';
import { BossDto } from './dtos/boss.dto';
import { GetAllBossesResponseDto } from './dtos/get-all-bosses-response.dto';
import { GetOneBossResponseDto } from './dtos/get-one-boss-response.dto';
import { CreateBossResponseDto } from './dtos/create-boss-response.dto';
import { UpdateBossResponseDto } from './dtos/update-boss-response.dto';
import { DeleteBossResponseDto } from './dtos/delete-boss-response.dto';

const config = require('../../knexfile');

@Injectable()
export class BossesService {
  private knex: Knex;
  constructor() {
    this.knex = require('knex')(config['development']);
  }

  async findAll() {
    try {
      const bosses = await this.knex<Boss>('bosses');
      const bossesDto = [];
      bosses.forEach(boss => {
        bossesDto.push(new BossDto(boss));
      });

      return new GetAllBossesResponseDto(
        200,
        true,
        bossesDto.length,
        bossesDto,
      );
    } catch (e) {
      console.error(e);

      return new GetAllBossesResponseDto(
        400,
        false,
        0,
        [],
        'error returning bosses.',
      );
    }
  }

  async findOne(id: string) {
    try {
      const boss = await this.knex<Boss>('bosses').where('id', id).first();
      if (!boss) throw new NotFoundException('boss with this id not found');

      return new GetOneBossResponseDto(200, true, new BossDto(boss));
    } catch (e) {
      console.error(e);

      return new GetOneBossResponseDto(
        400,
        false,
        undefined,
        'error returning boss.',
      );
    }
  }

  async save(dto: CreateBossRequestDto) {
    try {
      const boss: Boss = {
        id: randomUUID(),
        ...dto,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      await this.knex('bosses').insert(boss);

      return new CreateBossResponseDto(201, true, 'boss created successfully.');
    } catch (e) {
      console.error(e);

      return new CreateBossResponseDto(400, false, 'error creating boss.');
    }
  }

  async update(id: string, dto: UpdateBossRequestDto) {
    try {
      await this.exists(id);
      const result = await this.knex('bosses')
        .update({ ...dto })
        .where('id', id);

      return new UpdateBossResponseDto(
        200,
        true,
        'boss updated successfully.',
        result,
      );
    } catch (e) {
      console.error(e);

      return new UpdateBossResponseDto(400, false, 'error updating boss.', 0);
    }
  }

  async delete(id: string) {
    try {
      await this.exists(id);
      const result = await this.knex('bosses').where({ id }).del();

      return new DeleteBossResponseDto(
        200,
        true,
        'boss removed successfully.',
        result,
      );
    } catch (e) {
      console.error(e);

      return new DeleteBossResponseDto(400, false, 'error updating boss.', 0);
    }
  }

  async exists(id: string) {
    const result = await this.knex('bosses').select('id').where({ id }).first();

    if (!result) throw new NotFoundException('boss not found.');
  }
}
