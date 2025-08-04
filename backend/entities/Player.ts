export class Player {
    public readonly _id: string;
    public name: string;
    private isConnected: boolean;
    private currentGameID?: string;
    private wins: number;
    private losses: number;
    private draws: number;

    constructor(_id: string, name: string = `Player-${_id.slice(0, 6)}`){
        this._id = _id;
        this.name = name;
        this.isConnected = true;
        this.wins = 0;
        this.losses = 0;
        this.draws = 0;
    }

    public joinGame(gameId: string){
        this.currentGameID = gameId;
    }
    public leaveGame(){
        this.currentGameID = undefined;
    }
    public connect(){
        this.isConnected = true;
    }
    public disconnect(){
        this.isConnected = false;
    }
    public addWin(){
        this.wins += 1;
    }
    public addLoss(){
        this.losses += 1;
    }
    public addDraw(){
        this.draws += 1;
    }
    public getStatus(){
        return {
            wins: this.wins,
            losses: this.losses,
            draws: this.draws,
            totalGames: this.wins + this.losses + this.draws
        }
    }

    public getPublicProfile(){
        return {
            _id: this._id,
            name: this.name,
            isConnected: this.isConnected,
            currentGameID: this.currentGameID,
            ...this.getStatus()
        }
    }

}