import { Module } from "@nestjs/common";
import { PlayersService } from "./players.service";
import { PlayersController } from "./players.controller";

@Module({
    imports: [],
    providers: [PlayersService],
    controllers: [PlayersController],
    exports: [PlayersService],
})
export class PlayersModule {}