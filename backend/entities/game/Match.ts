import { Player } from "types/Player";
import Game from "./Game";



export class Match extends Game {
    
    public currentPlayer: Player;
    public players: {
        X?: string;
        O?: string;
    };
    public winner: Player | null;
    public numberMoves: number;

    constructor(_id: string){
        super(_id);
            this.currentPlayer = "X";
            this.players = {};
            this.winner = null;
            this.numberMoves = 0;
    }

    public addPlayer(playerId: string): Player | null {
        if (!this.players.X) {
            this.players.X = playerId;
            return "X";
        }
        if (!this.players.O) {
            this.players.O = playerId;
            this.status = "Jogando";
            return "O";
        }
        return null;
    }
   

    public removePlayer(playerId: string): Player | null {
        if (this.players.X === playerId) {
            delete this.players.X;
            return "X";
        }
        if (this.players.O === playerId) {
            delete this.players.O;
            return "O";
        }
        return null;
    }

    public getCurrentPlayerSymbol(playerID: string): Player | null{
        if (this.players.X === playerID) return "X";
        if (this.players.O === playerID) return "O";
        return null;
    }

    public switchPlayer() {
        if (this.status === "Jogando"){
            this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        }
    }


    private checkWinner(): Player | null {
        const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                return this.board[a] as Player;
            }
        }
        return null;
    }

    private checkGameEnd(): void {
        const winner = this.checkWinner();
        if (winner) {
            this.winner = winner;
            this.result = winner;
            this.status = 'Finalizado';
            return;
        }

        if (this.board.every(cell => cell !== null)) {
            this.result = 'Empate';
            this.status = 'Finalizado';
        }
    }

    public makeMove(position: number, playerID: string): boolean {
        if (this.status !== "Jogando") return false;

        if(this.board[position] !== null) return false;

        const playerSymbol = this.getCurrentPlayerSymbol(playerID);

        if (!playerSymbol || playerSymbol !== this.currentPlayer) return false;

        this.board[position] = playerSymbol;
        if (++this.numberMoves >= 5) {
            this.checkGameEnd();
        }
        this.switchPlayer();
        this.updatedAt = new Date();

        return true;
    }

    public reset(): void {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.status = this.players.X && this.players.O ? "Jogando" : "Aguardando";
        this.result = null;
        this.winner = null;
        this.updatedAt = new Date();
    }

  public toJSON() {
    return {
        id: this._id,
        board: this.board,
        currentPlayer: this.currentPlayer,
        status: this.status,
        result: this.result,
        players: this.players,
        winner: this.winner,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
        };
    }
}