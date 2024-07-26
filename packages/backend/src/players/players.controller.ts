import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerRequestDto } from './dtos/create-player-request.dto';
import { UpdatePlayerRequestDto } from './dtos/update-player-request.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get('/')
  async findAll() {
    return this.playersService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.playersService.findOne(id);
  }

  @Post('/')
  @HttpCode(201)
  async create(@Body() body: CreatePlayerRequestDto) {
    return this.playersService.save(body);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() body: UpdatePlayerRequestDto) {
    return this.playersService.update(id, body);
  }

  @Patch('/:id/up')
  async levelUp(@Param('id') id: string) {
    return this.playersService.levelUp(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.playersService.delete(id);
  }
}
