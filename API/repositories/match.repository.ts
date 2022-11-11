import sql from 'mssql';
import { Match } from '../models/match';

export class MatchRepository {

    private pool: sql.ConnectionPool;

    constructor(pool: sql.ConnectionPool) {
        this.pool = pool;
    }

    public async getMatches(): Promise<Match[]> {
        const result = await this.pool.request().
            query("SELECT" +
                " s.Id, s.Stadium, s.StartDateTime, s.Tournament_ID, s.Stage_ID, s.[State], s.Score," +
                "t.[Name] as 'HomeName', t1.[Name] as 'VisitName'," +
                " t.Id as 'HomeId'," +
                " t1.Id as 'VisitId'" +
                " FROM MATCH as s" +
                " JOIN TEAM t on t.Id = s.HomeId" +
                " JOIN TEAM t1 on t1.Id = s.VisitId" +
                " ORDER BY StartDateTime ASC");
        return result.recordset;
    }

    public async getMatchById(id: number): Promise<Match> {
        const result = await this.pool.request()
            .input('input_parameter', sql.Int, +id)
            .query("SELECT * FROM MATCH WHERE Id = @input_parameter");
        return result.recordset[0];
    }

    public async getMatchesByTournamentCode(code: string): Promise<Match[]> {
        const result = await this.pool.request()
            .input('input_parameter', sql.VarChar, code)
            .query("SELECT" +
                " s.Id, s.Stadium, s.StartDateTime, s.Tournament_ID, s.Stage_ID, s.[State], s.Score," +
                "t.[Name] as 'HomeName', t1.[Name] as 'VisitName'," +
                " t.Id as 'HomeId'," +
                " t1.Id as 'VisitId'" +
                " FROM MATCH as s" +
                " JOIN TEAM t on t.Id = s.HomeId" +
                " JOIN TEAM t1 on t1.Id = s.VisitId" +
                " WHERE Tournament_ID = @input_parameter ORDER BY StartDateTime ASC")
        return result.recordset;
    }

    public async createMatch(Stadium: string, StartDateTime: string, State: string,
        Score: string, Tournament_ID: String, Stage_ID: number,
        HomeId: number, VisitId: number): Promise<number> {
        const new_match = await this.pool.request()
            .input('Stadium', sql.VarChar, Stadium)
            .input('StartDateTime', sql.DateTime, StartDateTime)
            .input('State', sql.VarChar, State)
            .input('Score', sql.VarChar, Score)
            .input('Tournament_ID', sql.VarChar, Tournament_ID)
            .input('Stage_ID', sql.Int, Stage_ID)
            .input('HomeId', sql.Int, HomeId)
            .input('VisitId', sql.Int, VisitId)
            .query("INSERT INTO Match (Stadium, StartDateTime, State, Score, Tournament_ID, Stage_ID, HomeId, VisitId) VALUES"
                + " (@Stadium, @StartDateTime, @State, @Score, @Tournament_ID, @Stage_ID, @HomeId, @VisitId);" +
                " SELECT SCOPE_IDENTITY() AS id;");
        return new_match.recordset[0].id;
    }

    public async getMatchesByStageId(id: number): Promise<Match[]> {
        const result = await this.pool.request()
            .input('input_parameter', sql.Int, id)
            .query("SELECT * FROM Match WHERE Stage_ID = @input_parameter ORDER BY StartDateTime ASC");
        return result.recordset;
    }

    public async addTeamToMatch(Id_Team: number, Id_Match: number): Promise<number> {
        const add_team = await this.pool.request()
            .input('Id_Team', sql.Int, Id_Team)
            .input('Id_Match', sql.Int, Id_Match)
            .query("INSERT INTO TEAM_MATCH (Id_Team, Id_Match) VALUES"
                + " (@Id_Team, @Id_Match);");
        return add_team.rowsAffected[0];
    }

}