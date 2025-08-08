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

  const getGameStatusEmoji = () => {
    if (!game) return "🎮";
    if (game.status === "Aguardando") return "⏳";
    if (game.status === "Jogando") return "🔥";
    if (game.status === "Finalizado") {
      if (game.result === "Empate") return "🤝";
      return game.winner === playerSymbol ? "🎉" : "😔";
    }
    return "🎮";
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>
            <span className={styles.emoji}>{getGameStatusEmoji()}</span>
            Tic Tac Toe Online
            <span className={styles.emoji}>{getGameStatusEmoji()}</span>
          </h1>
          <p className={styles.subtitle}>
            Jogue o clássico jogo da velha com amigos online em tempo real
          </p>
        </div>
        
        {error && (
          <div className={styles.error}>
            <span className={styles.errorIcon}>⚠️</span>
            <span>{error}</span>
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
            <div className={styles.controlHeader}>
              <h2>🚀 Começar a Jogar</h2>
              <p>Crie uma nova partida ou entre em uma existente</p>
            </div>
            
            <button 
              onClick={createGame}
              disabled={!isConnected}
              className={styles.createButton}
            >
              <span className={styles.buttonIcon}>✨</span>
              Criar Nova Partida
            </button>
            
            <div className={styles.divider}>
              <span>ou</span>
            </div>
            
            <div className={styles.joinGame}>
              <div className={styles.inputGroup}>
                <label htmlFor="gameId" className={styles.inputLabel}>
                  🎯 ID da Partida
                </label>
                <input
                  id="gameId"
                  type="text"
                  placeholder="Digite o ID da partida"
                  value={gameIdInput}
                  onChange={(e) => setGameIdInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleJoinGame()}
                  className={styles.gameIdInput}
                />
              </div>
              <button 
                onClick={handleJoinGame}
                disabled={!isConnected || !gameIdInput.trim()}
                className={styles.joinButton}
              >
                <span className={styles.buttonIcon}>🎮</span>
                Entrar na Partida
              </button>
            </div>
          </div>
        )}

        {game && (
          <div className={styles.gameContainer}>
            <div className={styles.gameHeader}>
              <h2>
                {game.status === "Jogando" && (
                  <>
                    {game.currentPlayer === playerSymbol ? "🎯 Sua vez!" : "⏳ Aguardando..."}
                  </>
                )}
                {game.status === "Aguardando" && "⏳ Aguardando jogador..."}
                {game.status === "Finalizado" && (
                  <>
                    {game.result === "Empate" ? "🤝 Empate!" : 
                     game.winner === playerSymbol ? "🎉 Você ganhou!" : "😔 Você perdeu!"}
                  </>
                )}
              </h2>
            </div>
            
            <TicTacToeBoard 
              board={game.board} 
              currentPlayer={game.currentPlayer} 
              onCellClick={handleCellClick} 
              playerSymbol={playerSymbol} 
              disabled={isBoardDisabled}
            />
            
            {game.status === "Finalizado" && (
              <div className={styles.gameEndActions}>
                <button 
                  onClick={handleRestartGame}
                  className={styles.restartButton}
                >
                  <span className={styles.buttonIcon}>🔄</span>
                  Jogar Novamente
                </button>
              </div>
            )}
          </div>
        )}

        <footer className={styles.footer}>
          <p>Desenvolvido com ❤️ usando Next.js e Socket.io</p>
        </footer>
      </main>
    </div>
  );
}
