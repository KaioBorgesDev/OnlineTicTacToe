import { Match } from "entities/game/Match";
import { MatchRepositoryInterface } from "infra/interfaces/MatchRepositoryInterface"
import { PlayerRepositoryInterface } from "infra/interfaces/PlayerRepositoryInterface";
import { Player } from "types/Player";

export class CreateMatchUseCase {
    constructor(readonly matchRepository: MatchRepositoryInterface, readonly playerRepository: PlayerRepositoryInterface) {}

    async execute(playerId: string): Promise<{ match: Match, playerSymbol: Player}> {
        const player = await this.playerRepository.findById(playerId); 

        if (!player) throw new Error("Não foi encontrado o player!");

        const existingMatch = await this.matchRepository.findByPlayerId(playerId);

        if (existingMatch  && existingMatch.status !== "Finalizado"){
            const playerSymbol = existingMatch.getCurrentPlayerSymbol(playerId);
            return { match: existingMatch, playerSymbol: playerSymbol || 'X' }
        }
        
        const gameId = this.generateGameId()
        const match = new Match(gameId);

        const playerSymbol = match.addPlayer(playerId)

        if(!playerSymbol) throw new Error("Não é possivel adicionar o jogador à partida.")

            
        player.getGameSession().joinMatch(gameId);

        await this.playerRepository.update(player);

        await this.matchRepository.create(match);

        return { match, playerSymbol}
    } 

    private generateGameId(): string {
        return Math.random().toString(36).substring(2, 15);
  }
} 
