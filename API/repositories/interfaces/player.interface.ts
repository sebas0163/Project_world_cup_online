import { Player } from "../../models/player";

export interface IPlayerRepository {
    getPlayers(): Promise<Player[]>;
    getPlayersByTeam(id_team: number): Promise<{ Id: number, Name: string, Team: string, Rol: string }[]>;
}
