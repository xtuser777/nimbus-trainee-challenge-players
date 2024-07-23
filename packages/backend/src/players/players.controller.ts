import { Controller, Get, Param } from '@nestjs/common';
import { PlayersService } from './players.service';

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
}
