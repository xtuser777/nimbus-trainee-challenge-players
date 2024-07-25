import { Module } from "@nestjs/common";
import { PlayersBossesService } from "./players-bosses.service";
import { PlayersBossesController } from "./players-bosses.controller";

@Module({
    imports: [],
    providers: [PlayersBossesService],
    controllers: [PlayersBossesController],
    exports: [PlayersBossesService],
})
export class PlayersBossesModule {}
