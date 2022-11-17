import sql from 'mssql';
import { Team } from '../models/team';

export class TeamRepository {

    public async getTeams(): Promise<Team[]> {
        const result = await new sql.Request().query('SELECT * FROM Team');
        return result.recordset;
    }

    public async getTeamsByTournamentCode(id: string): Promise<Team[]> {
        const result = await new sql.Request()
            .input('input_parameter', sql.VarChar, id)
            .query("SELECT * FROM Team JOIN Compete ON Compete.Id_Team" +
                " = Team.Id WHERE Compete.TournamentCode = @input_parameter");
        return result.recordset;
    }

    public async createTeam(Name: string, Type: string): Promise<number> {
        const new_team = await new sql.Request()
            .input('Name', sql.VarChar, Name)
            .input('Type', sql.VarChar, Type)
            .query("INSERT INTO Team (Name,Type) VALUES (@Name,@Type)");
        return new_team.rowsAffected[0]
    }

    public async getTeamsByType(type: string): Promise<Team[]> {
        const result = await new sql.Request()
            .input('input_parameter', sql.VarChar, type)
            .query("SELECT * FROM Team WHERE Type = @input_parameter");
        return result.recordset;
    }

    public async getTeamById(id: number): Promise<Team> {
        const result = await new sql.Request()
            .input('input_parameter', sql.Int, +id)
            .query("SELECT * FROM Team WHERE Id = @input_parameter");
        return result.recordset[0];
    }
}