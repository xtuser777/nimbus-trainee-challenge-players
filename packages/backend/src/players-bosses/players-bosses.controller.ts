import { Controller, Get, Param, Post } from '@nestjs/common';
import { PlayersBossesService } from './players-bosses.service';

@Controller('players')
export class PlayersBossesController {
  constructor(private readonly playersBossesService: PlayersBossesService) {}

  @Get("/:playerId/bosses")
  async findAllBossesByPlayerId(@Param('playerId') playerId: string) {
    return this.playersBossesService.findAllBossesByPlayerId(playerId);
  }

  @Post("/:playerId/bosses/:bossId")
  async create(@Param('playerId') playerId: string, @Param('bossId') bossId: string) {
    return this.playersBossesService.save(playerId, bossId);
  }
}
