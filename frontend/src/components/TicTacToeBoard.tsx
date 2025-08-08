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

    const getCellClassName = (cell: string | null, index: number) => {
        let className = `${styles.cell}`;
        
        if (cell) {
            className += ` ${styles.filled}`;
        }
        
        return className;
    };

    const renderCellContent = (cell: string | null) => {
        if (!cell) return null;
        
        return (
            <span className={cell === 'X' ? styles.x : styles.o}>
                {cell}
            </span>
        );
    };

    const getBoardClassName = () => {
        let className = styles.board;
        
        if (disabled) {
            className += ` ${styles.disabled}`;
        }
        
        return className;
    };

    return (
        <div className={getBoardClassName()}>
            {board.map((cell, index) => (
                <button
                    key={index}
                    className={getCellClassName(cell, index)}
                    onClick={() => onCellClick(index)}
                    disabled={disabled || !!cell || !isPlayerTurn}
                    aria-label={`Célula ${index + 1}${cell ? `, ocupada por ${cell}` : ', vazia'}`}
                >
                    {renderCellContent(cell)}
                </button>
            ))}
        </div>
    );
};
