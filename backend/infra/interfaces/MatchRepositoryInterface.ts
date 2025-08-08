import { Match } from "../../entities/game/Match.js";

export interface MatchRepositoryInterface {
  create(match: Match): Promise<Match>;
  findById(id: string): Promise<Match | null>;
  findAll(): Promise<Match[]>;
  update(match: Match): Promise<Match>;
  delete(id: string): Promise<boolean>;
  findByPlayerId(playerId: string): Promise<Match | null>;
}
