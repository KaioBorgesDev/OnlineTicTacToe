import { Player } from "../../../entities/player/Player.js";
import { MatchRepositoryInterface } from "../../interfaces/MatchRepositoryInterface.js";
import { PlayerRepositoryInterface } from "../../interfaces/PlayerRepositoryInterface.js";



export class PlayerConnectionUseCase {
  constructor(
    private playerRepository: PlayerRepositoryInterface,
    private gameRepository: MatchRepositoryInterface
  ) {}

  async connect(playerId: string, playerName?: string): Promise<Player> {
    let player = await this.playerRepository.findById(playerId);
    
    if (!player) {
      player = new Player(playerId, playerName);
      await this.playerRepository.create(player);
    } else {
      player.getGameSession().connect();
      await this.playerRepository.update(player);
    }

    return player;
  }

  async disconnect(playerId: string): Promise<void> {
    const player = await this.playerRepository.findById(playerId);
    if (!player) return;

    player.getGameSession().disconnect();
    
    const currentMatchID = player.getGameSession().getStatus().currentMatchID
    if (currentMatchID) {
      const game = await this.gameRepository.findById(currentMatchID);
      if (game) {
        game.removePlayer(playerId);
        await this.gameRepository.update(game);
      }
      player.getGameSession().leaveMatch();
    }

    await this.playerRepository.update(player);
  }
}
