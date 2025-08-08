import { Board } from "../../types/Board.js";
import { GameResult } from "../../types/GameResult.js";
import { GameStatus } from "../../types/GameStatus.js";
import { PlayerSymbol } from "../../types/PlayerSymbol.js";


export default abstract class Game {
    public readonly _id: string;
    public board: Board;
    public status: GameStatus;
    public result: GameResult;
    public createdAt: Date;
    public updatedAt: Date;


    constructor(id: string) {
        this._id = id;
        this.board = Array(9).fill(null) as Board;
        this.status = "Aguardando";
        this.result = null;
        this.createdAt = new Date();
        this.updatedAt = new Date();

    }

    public abstract removePlayer(playerId: string): PlayerSymbol | null
    public abstract addPlayer(playerId: string): PlayerSymbol | null
    public abstract reset(): void
    public abstract toJSON(): void
}