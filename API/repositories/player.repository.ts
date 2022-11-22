import sql from 'mssql';
import { Player } from '../models/player';


export class PlayerRepository {

    public async getPlayers(): Promise<Player[]> {
        const result = await new sql.Request().query("SELECT * FROM PLAYER");
        return result.recordset;
    }

    public async getPlayersByTeam(id_team: number): Promise<{ Id: number, Name: string, Team: string, Rol: string }[]> {
        const result = await new sql.Request()
            .input('id_team', sql.Int, id_team)
            .query("SELECT PLAYER.Id, PLAYER.[Name], TEAM.[Name] AS Team, PLAYER.Rol " +
                "FROM ((PLAYER_TEAM " +
                "INNER JOIN TEAM ON PLAYER_TEAM.Id_Team = TEAM.Id) " +
                "INNER JOIN PLAYER ON PLAYER_TEAM.Id_Player = PLAYER.Id) " +
                "WHERE PLAYER_TEAM.Id_Team = @id_team;");

        return result.recordset;
    }
}