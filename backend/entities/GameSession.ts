export class GameSession {
    private isConnected: boolean;
    private currentGameID?: string;

    constructor() {
        this.isConnected = true;
        this.currentGameID = undefined;
    }

    public getStatus() {
        return {
            isConnected: this.isConnected,
            currentGameID: this.currentGameID
        };
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
}