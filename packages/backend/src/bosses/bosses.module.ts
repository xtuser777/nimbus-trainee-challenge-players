import { Module } from "@nestjs/common";
import { BossesController } from "./bosses.controller";
import { BossesService } from "./bosses.service";

@Module({
  imports: [],
  controllers: [BossesController],
  providers: [BossesService],
})
export class BossesModule {}
