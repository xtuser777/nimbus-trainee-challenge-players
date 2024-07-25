import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BossesService } from './bosses.service';
import { CreateBossDto } from './dtos/create-boss.dto';
import { UpdateBossDto } from './dtos/update-boss.dto';

@Controller('bosses')
export class BossesController {
  constructor(private readonly bossesService: BossesService) {}

  @Get('/')
  async findAll() {
    return this.bossesService.findAll();
  }

  @Get("/:id")
  async findOne(@Param('id') id: string) {
    return this.bossesService.findOne(id);
  }

  @Post("/")
  async create(@Body() body: CreateBossDto) {
    return this.bossesService.save(body);
  }

  @Put('/:id')
  async update(@Param("id") id: string, @Body() body: UpdateBossDto) {
    return this.bossesService.update(id, body);
  }

  @Delete('/:id')
  async delete(@Param("id") id: string) {
    return this.bossesService.delete(id);
  }
}
