import { Board } from "@/types/Board";
import { GameResult } from "@/types/GameResult";
import { GameStatus } from "@/types/GameStatus";
import { Player } from "@/types/Player";

export interface GameState {
    id: string;
    board: Board,
    currentPlayer: Player,
    status: GameStatus,
    result: GameResult,
    players: {
        X?: string,
        O?: string
    },
    winner: Player | null
    createdAt: string,
    updatedAt: string
}