import Game from "entities/game/Game";
import { Match } from "entities/game/Match";
import { MatchRepositoryInterface } from "infra/interfaces/MatchRepositoryInterface"
import { PlayerRepositoryInterface } from "infra/interfaces/PlayerRepositoryInterface";

export default class MakeMoveUseCase {
    constructor(
        private matchRepository: MatchRepositoryInterface,
        private playerRepository: PlayerRepositoryInterface
    ) {
        
    }
    
    async execute(matchID: string, playerID: string, position: number): Promise<Game> {
        if (position < 0 || position >= 9) throw new Error("Posição inválida");
    
        const match = await this.matchRepository.findById(matchID);

        if (!match) throw new Error("Partida não foi encontrada");

        const player = this.playerRepository.findById(playerID);

        if (!player) throw new Error("Não há player com esse ID");

        const moveSucess = match.makeMove(position, playerID);

        if (!moveSucess) throw new Error("Movimento inválido");

        if(match.status === 'Finalizado') await this.updatePlayerStats(match);

        await this.matchRepository.update(match)

        return match;
    }

    private async updatePlayerStats(match: Match): Promise<void> {
        const playerX = await this.playerRepository.findById(match.players.X!);
        const playerO = await this.playerRepository.findById(match.players.O!);

        if (!playerX || !playerO) return;
        
        if (match.result === "Empate") {
            playerX.getStatistics().addDraw();
            playerO.getStatistics().addDraw();
        } else if (match.winner === 'X') {
            playerX.getStatistics().addWin();
            playerO.getStatistics().addLoss();
        } else if (match.winner === 'O') {
            playerO.getStatistics().addWin();
            playerX.getStatistics().addLoss();
        }

        await this.playerRepository.update(playerX);
        await this.playerRepository.update(playerO);
  }
}