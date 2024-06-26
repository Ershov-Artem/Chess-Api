import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { GameService } from './game/game.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GameModule,
    ConfigModule.forRoot({envFilePath: './env/.env'})
  ],
  controllers: [AppController],
  providers: [AppService, GameService],
})
export class AppModule {}
