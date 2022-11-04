import sql from 'mssql';
import { Tournament } from '../models/tournament';

export class TournamentRepository {

    private pool: sql.ConnectionPool;

    constructor(pool: sql.ConnectionPool) {
        this.pool = pool;
    }

    public async getTournaments(): Promise<Tournament[]> {
        const result = await this.pool.request().query("SELECT * FROM TOURNAMENT");
        return result.recordset;
    }

    public async getTournamentByCode(code: string): Promise<Tournament> {
        const result = await this.pool.request()
            .input('input_parameter', sql.VarChar, code)
            .query("SELECT * FROM TOURNAMENT WHERE CodeTournament = @input_parameter");
        return result.recordset[0];
    }

    public async createTournament(Name: string, StartDate: string, EndDate: string,
        Rules: string, Type: string): Promise<number> {
        const new_tournament = await this.pool.request()
            .input('Name', sql.VarChar, Name)
            .input('StartDate', sql.Date, StartDate)
            .input('EndDate', sql.Date, EndDate)
            .input('Rules', sql.VarChar, Rules)
            .input('Type', sql.VarChar, Type)
            .query("INSERT INTO TOURNAMENT (Name, StartDate, EndDate, Rules, Type) VALUES (@Name, @StartDate, @EndDate, @Rules, @Type);"
                + " SELECT SCOPE_IDENTITY() AS id;");
        return new_tournament.recordset[0].id;
    }

    public async addTeamToTournament(Id_Team: number, TournamentCode: string): Promise<number> {
        const add_team = await this.pool.request()
            .input('Id_Team', sql.Int, Id_Team)
            .input('TournamentCode', sql.VarChar, TournamentCode)
            .query("INSERT INTO COMPETE (Id_Team, TournamentCode) VALUES (@Id_Team, @TournamentCode)");
        return add_team.rowsAffected[0];
    }


}