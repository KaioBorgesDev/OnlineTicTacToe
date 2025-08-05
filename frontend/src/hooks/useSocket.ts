"use client";

import { GameState } from "@/interfaces/GameState";
import { PlayerData } from "@/interfaces/PlayerData";
import { UseSocketReturn } from "@/interfaces/UseSocketReturn";
import { GameResult } from "@/types/GameResult";
import { Player } from "@/types/Player";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";


export const useSocket = (): UseSocketReturn => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [game, setGame] = useState<GameState | null>(null);
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [playerSymbol, setPlayerSymbol] = useState<Player | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:3001');
    const socket = socketRef.current;

    socket.on('connect', () => {
      setIsConnected(true);
      setError(null);
      socket.emit('player:connect', { name: `Player ${socket.id?.slice(0, 6)}` });
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('player:connected', (data: { player: PlayerData }) => {
      setPlayer(data.player);
    });

    socket.on('game:created', (data: { game: GameState; playerSymbol: Player; playerId: string }) => {
      setGame(data.game);
      setPlayerSymbol(data.playerSymbol);
      setError(null);
    });

    socket.on('game:joined', (data: { game: GameState; playerSymbol: Player; playerId: string }) => {
      setGame(data.game);
      setPlayerSymbol(data.playerSymbol);
      setError(null);
    });

    socket.on('game:updated', (data: { game: GameState }) => {
      setGame(data.game);
    });

    socket.on('game:finished', (data: { game: GameState; winner: Player | null; result: GameResult }) => {
      setGame(data.game);
    });

    socket.on('game:restarted', (data: { game: GameState; playerSymbol: Player; playerId: string }) => {
      setGame(data.game);
      setPlayerSymbol(data.playerSymbol);
      setError(null);
    });

    socket.on('error', (data: { message: string }) => {
      setError(data.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const createGame = () => {
    if (socketRef.current) {
      socketRef.current.emit('game:create');
    }
  };

  const joinGame = (gameId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('game:join', { gameId });
    }
  };

  const makeMove = (position: number) => {
    if (socketRef.current && game) {
      socketRef.current.emit('game:move', { gameId: game.id, position });
    }
  };

  const restartGame = () => {
    if (socketRef.current && game) {
      socketRef.current.emit('game:restart', { gameId: game.id });
    }
  };

  return {
    socket: socketRef.current,
    isConnected,
    game,
    player,
    playerSymbol,
    error,
    createGame,
    joinGame,
    makeMove,
    restartGame,
  };
};
