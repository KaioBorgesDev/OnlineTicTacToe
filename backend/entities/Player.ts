export class Player {
    public readonly _id: string;
    public name: string;
    public isConnected: boolean;
    public currentGameID?: string;
    public wins: number;
    public losses: number;
    public draws: number;
    public totalGames: number;

    constructor(_id: string, name: string = `Player-${_id.slice(0, 6)}`){
        this._id = _id;
        this.name = name;
        this.isConnected = true;
        this.wins = 0;
        this.losses = 0;
        this.draws = 0;
        this.totalGames = 0;
    }
}