import { Module } from "@nestjs/common";
import { PlayersItemsService } from "./players-items.service";
import { PlayersItemsController } from "./players-items.controller";
import { PlayersModule } from "src/players/players.module";
import { ItemsModule } from "src/items/items.module";

@Module({
    imports: [PlayersModule, ItemsModule],
    providers: [PlayersItemsService],
    controllers: [PlayersItemsController],
    exports: [PlayersItemsService],
})
export class PlayersItemsModule {}
