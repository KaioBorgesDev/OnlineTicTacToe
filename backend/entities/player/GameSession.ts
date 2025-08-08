export class GameSession {
    private isConnected: boolean;
    private currentMatchID?: string | undefined;

    constructor() {
        this.isConnected = true;
        this.currentMatchID = undefined;
    }

    public getStatus() {
        return {
            isConnected: this.isConnected,
            currentMatchID: this.currentMatchID
        };
    }
    // * isso é diferente de isInMatch *
    public isInGame(): boolean {
        return this.isConnected
    }

    public isInMatch(): boolean{
        return this.currentMatchID !== undefined && this.currentMatchID !== null
    }
    public joinMatch(matchID: string){
        this.currentMatchID = matchID;
    }
    public leaveMatch(){
        this.currentMatchID = undefined;
    }
    public connect(){
        this.isConnected = true;
    }
    public disconnect(){
        this.isConnected = false;
    }
}