import { Module } from "@nestjs/common";
import { PlayersItemsService } from "./players-items.service";
import { PlayersItemsController } from "./players-items.controller";

@Module({
    imports: [],
    providers: [PlayersItemsService],
    controllers: [PlayersItemsController],
    exports: [PlayersItemsService],
})
export class PlayersItemsModule {}
