import { Player } from "entities/player/Player";
import { PlayerRepositoryInterface } from "infra/interfaces/PlayerRepositoryInterface";

export class InMemoryPlayerRepository implements PlayerRepositoryInterface {
  private players: Map<string, Player> = new Map();

  async create(player: Player): Promise<Player> {
    this.players.set(player._id, player);
    return player;
  }

  async findById(id: string): Promise<Player | null> {
    return this.players.get(id) || null;
  }

  async findAll(): Promise<Player[]> {
    return Array.from(this.players.values());
  }

  async update(player: Player): Promise<Player> {
    this.players.set(player._id, player);
    return player;
  }

  async delete(id: string): Promise<boolean> {
    return this.players.delete(id);
  }

  async findConnectedPlayers(): Promise<Player[]> {
    return Array.from(this.players.values()).filter(player => player.getGameSession().isInGame());
  }
}
