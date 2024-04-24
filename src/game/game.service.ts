import { Injectable, HttpException} from '@nestjs/common';
import { ClientTCP, TcpClientOptions } from '@nestjs/microservices';
import { Command } from './game.entity';
import Stack from 'ts-data.stack';


@Injectable()
export class GameService {
        
    private client?: ClientTCP;

    private timeout: number = 300;

    private timer: Timer = new Timer(()=>this.reset(true));

    private commandStack: Stack<Command> = new Stack();

    /// starts connection to robo by TCP
    /// if client is not null - game already started
    /// and method throws an Exception with status code 503 (Service Unavailable)
    async start() {
        if (this.client){
            throw new HttpException('Already started', 503);
        }

        this.client = new ClientTCP({host:process.env.ip || '0.0.0.0', port: parseInt(process.env.port) || 0});
    
        await this.client.connect()
        this.timer.setTime(this.timeout);
    }

    async sendCommand(command: Command) {
        this.timer.setTime(this.timeout);
        if (!this.validate(command)){
            throw new HttpException('Wrong data: there are board 1 or 2 and positions [1..48]', 400);
        }
        var message = `Move,${command.boardFrom},${command.positionFrom},${command.boardTo},${command.positionTo}\r\n`
        this.client.send(null, message)
        this.commandStack.push(new Command(command.boardTo,command.boardFrom,command.positionTo,command.positionFrom))
    }

    /// moves chess pieces into initial positions
    /// if reset.endGame - client setts to null
    async reset(endGame: boolean) {
        while (!this.commandStack.isEmpty()){
            this.timer.setTime(this.timeout);
            var command = this.commandStack.pop()
            var message = `Move,${command.boardFrom},${command.positionFrom},${command.boardTo},${command.positionTo}\r\n`
            this.client.send(null, message)
            await new Promise(f => setTimeout(f, 100))
        }
        if (endGame) {
            this.client = null;
        }
    }

    /// validates command to robo
    /// there are board 1 or 2
    /// and positions [1..48]
    /// returns boolean
    private validate(command: Command) {
        if (command.boardFrom != 1 && command.boardFrom != 2){
            return false;
        }
        if (command.boardTo != 1 && command.boardTo != 2){
            return false;
        }
        if (command.positionFrom < 1|| command.positionFrom > 48){
            return false;
        }
        if (command.positionTo < 1|| command.positionTo > 48){
            return false;
        }
        return true;
    }

}

class Timer {
    constructor(onTimerEnd: {(): Promise<void>}){
        this.onTimerEnd = onTimerEnd
    }

    private onTimerEnd: {(): Promise<void>}
    private time: number
    private cancel: boolean;

    async setTime(time: number) {
        this.cancel = true;
        await new Promise(f => setTimeout(f, 1100));
        this.cancel = false;
        this.time = time-1;
        this.startTimer();
    }

    private async startTimer() {
        for (this.time;this.time>=0;this.time--){
            await new Promise(f => setTimeout(f, 1000))
            if (this.cancel){
                return;
            }
        }
        this.onTimerEnd();
    }
}