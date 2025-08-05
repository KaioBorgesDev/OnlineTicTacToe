import { Match } from "entities/game/Match";
import { MatchRepositoryInterface } from "infra/interfaces/MatchRepositoryInterface";
import { PlayerRepositoryInterface } from "infra/interfaces/PlayerRepositoryInterface";
import { Player } from "types/Player";

export default class JoinMatchUseCase {
    
    constructor
    ( readonly matchRepository: MatchRepositoryInterface,
      readonly playerRepository: PlayerRepositoryInterface
    ){}

    async execute(matchID: string, playerID: string): Promise< { match: Match, playerSymbol: string }>{
        const match = await this.matchRepository.findById(matchID);
        if (!match) throw new Error("Não há nenhuma partida com esse ID");

        const player = await this.playerRepository.findById(playerID);
        if (!player) throw new Error("Não foi encontrado nenhum player com esse ID");

        const existingSymbol = match.getCurrentPlayerSymbol(playerID)

        if (existingSymbol) {
            return { match, playerSymbol: existingSymbol}
        }

        const playerSymbol = match.addPlayer(playerID);

        if (!playerSymbol) throw new Error("A partida está cheia.")

        player.getGameSession().joinMatch(matchID);

        await this.playerRepository.update(player);

        await this.matchRepository.update(match);

        return { match, playerSymbol }
    }
}