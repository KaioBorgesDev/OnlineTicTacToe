import { Socket } from "socket.io-client";
import { GameState } from "./GameState";
import { PlayerData } from "./PlayerData";
import { Player } from "@/types/Player";

export interface UseSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
  game: GameState | null;
  player: PlayerData | null;
  playerSymbol: Player | null;
  error: string | null;
  createGame: () => void;
  joinGame: (gameId: string) => void;
  makeMove: (position: number) => void;
  restartGame: () => void;
}
