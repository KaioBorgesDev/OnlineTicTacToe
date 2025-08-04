import { Board } from "types/Board";
import { GameResult } from "types/GameResult";
import { GameStatus } from "types/GameStatus";
import { Player } from "types/Player";

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

    public abstract removePlayer(playerId: string): Player | null
    public abstract addPlayer(playerId: string): Player | null
    public abstract reset(): void
    public abstract toJSON()
}