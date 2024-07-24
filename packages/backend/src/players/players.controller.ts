import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get('/')
  async findAll() {
    return this.playersService.findAll();
  }

  @Get("/:id")
  async findOne(@Param('id') id: string) {
    return this.playersService.findOne(id);
  }

  @Post("/")
  async create(@Body() body: CreatePlayerDto) {
    return this.playersService.save(body);
  }

  @Put('/:id')
  async update(@Param("id") id: string, @Body() body: UpdatePlayerDto) {
    return this.playersService.update(id, body);
  }

  @Patch('/:id/up')
  async levelUp(@Param("id") id: string) {
    return this.playersService.levelUp(id);
  }

  @Delete('/:id')
  async delete(@Param("id") id: string) {
    return this.playersService.delete(id);
  }
}
