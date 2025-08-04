export class GameStatistics {
    private wins: number;
    private losses: number;
    private draws: number;

    constructor() {
        this.wins = 0;
        this.losses = 0;
        this.draws = 0;
    }

    public addWin() {
        this.wins += 1;
    }

    public addLoss() {
        this.losses += 1;
    }

    public addDraw() {
        this.draws += 1;
    }

    public getStats() {
        return {
            wins: this.wins,
            losses: this.losses,
            draws: this.draws,
            totalGames: this.wins + this.losses + this.draws
        };
    }
}