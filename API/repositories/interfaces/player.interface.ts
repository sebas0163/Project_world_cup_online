import { Player } from "../../models/player";

export interface IPlayerRepository {
    getPlayers(): Promise<Player[]>;
    getPlayersByTeam(id_team: number): Promise<Player[]>;
}
