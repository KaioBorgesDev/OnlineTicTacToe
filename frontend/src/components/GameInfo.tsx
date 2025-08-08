import React from "react";
import styles from "./GameInfo.module.css";
import { GameInfoProps } from "@/interfaces/GameInfoProps";



export const GameInfo: React.FC<GameInfoProps> = ({
    game,
    player,
    playerSymbol,
    isConnected,
}) => {
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
                    <p className={styles.gameId}>ID da partida: {game.id}</p>
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
