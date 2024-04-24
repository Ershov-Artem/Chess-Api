export class Command {
    constructor(
        boardFrom: number, 
        boardTo: number,
        positionFrom: number,
        positionTo: number
        ){
            this.boardFrom = boardFrom
            this.boardTo = boardTo
            this.positionFrom = positionFrom
            this.positionTo = positionTo
    }

    boardFrom: number
    boardTo: number
    positionFrom: number
    positionTo: number
}