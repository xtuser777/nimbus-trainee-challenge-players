import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { BossesService } from './bosses.service';
import { CreateBossRequestDto } from './dtos/create-boss-request.dto';
import { UpdateBossRequestDto } from './dtos/update-boss-request.dto';

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
  @HttpCode(201)
  async create(@Body() body: CreateBossRequestDto) {
    return this.bossesService.save(body);
  }

  @Put('/:id')
  async update(@Param("id") id: string, @Body() body: UpdateBossRequestDto) {
    return this.bossesService.update(id, body);
  }

  @Delete('/:id')
  async delete(@Param("id") id: string) {
    return this.bossesService.delete(id);
  }
}
