import { Player } from "../../entities/player/Player.js";

export interface PlayerRepositoryInterface {
  create(player: Player): Promise<Player>;
  findById(id: string): Promise<Player | null>;
  findAll(): Promise<Player[]>;
  update(player: Player): Promise<Player>;
  delete(id: string): Promise<boolean>;
  findConnectedPlayers(): Promise<Player[]>;
}
