export interface PlayerData {
    id: string,
    name: string, 
    isConnected: boolean,
    currentGameId?: string,
    stats: {
        wins: number,
        losses: number,
        draws: number
        totalGames: number,
    }
    createdAt: string,
}
