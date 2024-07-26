import { Module } from "@nestjs/common";
import { PlayersBossesService } from "./players-bosses.service";
import { PlayersBossesController } from "./players-bosses.controller";
import { PlayersModule } from "src/players/players.module";

@Module({
    imports: [PlayersModule],
    providers: [PlayersBossesService],
    controllers: [PlayersBossesController],
    exports: [PlayersBossesService],
})
export class PlayersBossesModule {}
