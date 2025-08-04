import { GameSession } from "./GameSession";
import { GameStatistics } from "./GameStatistics";
import { User } from "./User";

export class Player extends User {

    private gameStatistics: GameStatistics;
    private gameSession: GameSession;

    constructor(_id: string, name: string = `Player-${_id.slice(0, 6)}`){
        super(_id, name);
        this.gameSession = new GameSession();
        this.gameStatistics = new GameStatistics();
    }

    public getPublicProfile(){
        return {
            _id: this._id,
            name: this.name,
            ...this.gameSession.getStatus(),
            ...this.gameStatistics.getStats()
        }
    }

    public getGameSessionStatus() {
        return this.gameSession;
    }

    public getStatistics() {
        return this.gameStatistics;
    }
}