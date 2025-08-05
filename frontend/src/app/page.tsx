"use client"
import { TicTacToeBoard } from "@/components/TicTacToeBoard";
import { GameInfo } from "@/components/GameInfo";
import { useSocket } from "@/hooks/useSocket";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const {
    isConnected,
    game,
    player,
    playerSymbol,
    error,
    createGame,
    joinGame,
    makeMove,
    restartGame,
  } = useSocket();

  const [gameIdInput, setGameIdInput] = useState("");

  const handleJoinGame = () => {
    if (gameIdInput.trim()) {
      joinGame(gameIdInput.trim());
      setGameIdInput("");
    }
  };

  const handleCellClick = (position: number) => {
    if (game && game.status === "Jogando" && game.currentPlayer === playerSymbol) {
      makeMove(position);
    }
  };

  const handleRestartGame = () => {
    if (game && game.status === "Finalizado") {
      restartGame();
    }
  };

  const isBoardDisabled = !game || game.status !== "Jogando" || game.currentPlayer !== playerSymbol;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Tic Tac Toe Online</h1>
        
        {error && (
          <div className={styles.error}>
            ❌ {error}
          </div>
        )}

        <GameInfo
          game={game}
          player={player}
          playerSymbol={playerSymbol}
          isConnected={isConnected}
        />

        {!game && (
          <div className={styles.gameControls}>
            <button 
              onClick={createGame}
              disabled={!isConnected}
              className={styles.createButton}
            >
              Criar Nova Partida
            </button>
            
            <div className={styles.joinGame}>
              <input
                type="text"
                placeholder="ID da partida"
                value={gameIdInput}
                onChange={(e) => setGameIdInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleJoinGame()}
                className={styles.gameIdInput}
              />
              <button 
                onClick={handleJoinGame}
                disabled={!isConnected || !gameIdInput.trim()}
                className={styles.joinButton}
              >
                Entrar na Partida
              </button>
            </div>
          </div>
        )}

        {game && (
          <div className={styles.gameContainer}>
            <TicTacToeBoard 
              board={game.board} 
              currentPlayer={game.currentPlayer} 
              onCellClick={handleCellClick} 
              playerSymbol={playerSymbol} 
              disabled={isBoardDisabled}
            />
            
            {game.status === "Finalizado" && (
              <button 
                onClick={handleRestartGame}
                className={styles.restartButton}
              >
                Jogar Novamente
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
