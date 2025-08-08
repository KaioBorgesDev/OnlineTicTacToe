import { GameState } from "./GameState";
import { PlayerData } from "./PlayerData";

export interface GameInfoProps {
    game: GameState | null;
    player: PlayerData | null;
    playerSymbol: string | null;
    isConnected: boolean;
}