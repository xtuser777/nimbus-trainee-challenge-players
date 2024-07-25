import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { BossesModule } from './bosses/bosses.module';
import { ItemsModule } from './items/items.module';
import { PlayersBossesModule } from './players-bosses/players-bosses.module';
import { PlayersItemsModule } from './players-items/players-items.module';

@Module({
  imports: [
    PlayersModule,
    BossesModule,
    ItemsModule,
    PlayersBossesModule,
    PlayersItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
