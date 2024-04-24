import { Body, Controller, Param, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { Command } from './game.entity';

@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Post('/start')
    async start(){
        return await this.gameService.start();
    }

    @Post('/reset')
    async reset(@Body('endGame') endGame: boolean){
        return await this.gameService.reset(endGame);
    }

    @Post('/sendCommand')
    async sendCommand(@Body() command: Command) {
        return await this.gameService.sendCommand(command);
    }
}