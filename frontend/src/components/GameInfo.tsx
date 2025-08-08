import React, { useState } from "react";
import styles from "./GameInfo.module.css";
import { GameInfoProps } from "@/interfaces/GameInfoProps";

export const GameInfo: React.FC<GameInfoProps> = ({
    game,
    player,
    playerSymbol,
    isConnected,
}) => {
    const [copySuccess, setCopySuccess] = useState(false);
    const getStatusMessage = () => {
        if (!game) return "Nenhum jogo ativo...";

        switch (game.status) {
            case "Aguardando":
                return "Aguardando outro jogador...";
            case "Jogando":
                const isYourTurn = game.currentPlayer === playerSymbol;
                return isYourTurn ? "Sua vez!" : `Vez do jogador ${game.currentPlayer}`;
            case "Finalizado":
                if (game.result === "Empate") return "O jogo terminou em empate!";
                const youWon = game.winner === playerSymbol;
                return youWon ? "Você ganhou! 🎉" : `O jogador ${game.winner} ganhou!`;
            default:
                return "";
        }
    };

    const getConnectionStatus = () => {
        return isConnected ? "🟢 Conectado" : "🔴 Desconectado";
    };

    const copyGameId = async () => {
        if (!game?.id) return;

        try {
            await navigator.clipboard.writeText(game.id);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Falha ao copiar ID:', err);
            // fallback para navegadores mais antigos
            const textArea = document.createElement('textarea');
            textArea.value = game.id;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        }
    };

    return (
        <div className={styles.gameInfo}>
            <div className={styles.connectionStatus}>
                {getConnectionStatus()}
            </div>

            {player && (
                <div className={styles.playerInfo}>
                    <h3>Player: {player.name}</h3>
                    {playerSymbol && (
                        <p className={styles.symbol}>
                            Você é: <span className={playerSymbol === "X" ? styles.x : styles.o}>
                                {playerSymbol}
                            </span>
                        </p>
                    )}
                </div>
            )}

            {game && (
                <div className={styles.gameStatus}>
                    <div className={styles.gameIdSection}>
                        <div className={styles.gameId}>
                            <span className={styles.gameIdLabel}>ID da partida:</span>
                            <span className={styles.gameIdValue}>{game.id}</span>
                        </div>
                        <button
                            onClick={copyGameId}
                            className={`${styles.copyButton} ${copySuccess ? styles.copySuccess : ''}`}
                            title="Copiar ID da partida"
                        >
                            {copySuccess ? (
                                <>
                                    <span className={styles.copyIcon}>✅</span>
                                    Copiado!
                                </>
                            ) : (
                                <>
                                    <span className={styles.copyIcon}>📋</span>
                                    Copiar
                                </>
                            )}
                        </button>
                    </div>
                    <p className={styles.status}>{getStatusMessage()}</p>

                    <div className={styles.playersInfo}>
                        <div className={styles.playerSlot}>
                            <span className={styles.x}>X</span>: {game.players.X ? "Conectado" : "Aguardando..."}
                        </div>
                        <div className={styles.playerSlot}>
                            <span className={styles.o}>O</span>: {game.players.O ? "Conectado" : "Aguardando..."}
                        </div>
                    </div>
                </div>
            )}

            {
                player && player.stats && player.stats.totalGames > 0 && (
                    <div className={styles.stats}>
                        <h4>Suas Estatísticas</h4>
                        <div className={styles.statsGrid}>
                            <div>Vitórias: {player.stats.wins}</div>
                            <div>Derrotas: {player.stats.losses}</div>
                            <div>Empates: {player.stats.draws}</div>
                            <div>Total: {player.stats.totalGames}</div>
                        </div>
                    </div>
                )}
        </div>
    );
};
