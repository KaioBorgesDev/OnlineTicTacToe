import React from 'react';
import styles from './TicTacToeBoard.module.css';
import { Board } from '@/types/Board';
import { Player } from '@/types/Player';

interface TicTacToeBoardProps {
    board: Board;
    onCellClick: (position: number) => void;
    disabled: boolean;
    currentPlayer: Player;
    playerSymbol: Player | null;
}

export const TicTacToeBoard: React.FC<TicTacToeBoardProps> = ({
    board,
    onCellClick,
    disabled,
    currentPlayer,
    playerSymbol,
}) => {
    const isPlayerTurn = currentPlayer === playerSymbol;

    return (
        <div className={styles.board}>
            {board.map((cell, index) => (
                <button
                    key={index}
                    className={`${styles.cell} ${cell ? styles.filled : ''}`}
                    onClick={() => onCellClick(index)}
                    disabled={disabled || !!cell || !isPlayerTurn}
                >
                    {cell && (
                        <span className={cell === 'X' ? styles.x : styles.o}>
                            {cell}
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
};
