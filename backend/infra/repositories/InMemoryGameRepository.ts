import { Match } from "entities/game/Match";
import { MatchRepositoryInterface } from "infra/interfaces/MatchRepositoryInterface";

export class InMemoryMatchRepository implements MatchRepositoryInterface {
  private matchs: Map<string, Match> = new Map();

  async create(match: Match): Promise<Match> {
    this.matchs.set(match._id, match);
    return match;
  }

  async findById(id: string): Promise<Match | null> {
    return this.matchs.get(id) || null;
  }

  async findAll(): Promise<Match[]> {
    return Array.from(this.matchs.values());
  }

  async update(match: Match): Promise<Match> {
    this.matchs.set(match._id, match);
    return match;
  }

  async delete(id: string): Promise<boolean> {
    return this.matchs.delete(id);
  }

  async findByPlayerId(playerId: string): Promise<Match | null> {
    for (const match of this.matchs.values()) {
      if (match.players.X === playerId || match.players.O === playerId) {
        return match;
      }
    }
    return null;
  }
}
