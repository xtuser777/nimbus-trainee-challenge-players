import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from '@nestjsplus/knex';
import { PlayersService } from './players/players.service';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    /*KnexModule.register({
      client: 'pg',
      connection: {
        host: 'localhost',
        user: 'admin',
        password: 'admin',
        database: 'challenge',
        port: 5432,
      },
    }),*/
    PlayersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
