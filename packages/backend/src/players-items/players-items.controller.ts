import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PlayersItemsService } from './players-items.service';
import { CreatePlayerItemRequestDto } from './dtos/create-player-item-request.dto';
import { DeletePlayerItemRequestDto } from './dtos/delete-player-item-request.dto';

@Controller('players')
export class PlayersItemsController {
  constructor(private readonly playersItemsService: PlayersItemsService) {}

  @Get("/:playerId/items")
  async findAllItemsByPlayerId(@Param('playerId') playerId: string) {
    return this.playersItemsService.findAllItemsByPlayerId(playerId);
  }

  @Post("/:playerId/items/:itemId")
  async create(
    @Param('playerId') playerId: string, 
    @Param('itemId') itemId: string,
    @Body() body: CreatePlayerItemRequestDto
  ) {
    return this.playersItemsService.save(playerId, itemId, body);
  }

  @Delete('/:playerId/items/:itemId')
  async delete(
    @Param('playerId') playerId: string, 
    @Param('itemId') itemId: string,
    @Body() body: DeletePlayerItemRequestDto
  ) {
    return this.playersItemsService.delete(playerId, itemId, body);
  }
}
