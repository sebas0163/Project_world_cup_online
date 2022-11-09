import sql from 'mssql';
import { Tournament } from '../models/tournament';

export class TournamentRepository {

    private pool: sql.ConnectionPool;

    constructor(pool: sql.ConnectionPool) {
        this.pool = pool;
    }

    private generateRandomCode = (num: number) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result1 = '';
        const charactersLength = characters.length;
        for (let i = 0; i < num; i++) {
            result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result1;
    }

    private async addStagesToTournament(StageList: string[], Tournament_ID: string): Promise<number> {
        const length = StageList.length;
        let result = 0;
        for (let i = 0; i < length; i++) {
            const add_stage = await this.pool.request()
                .input('Name', sql.VarChar, StageList[i])
                .input('Tournament_ID', sql.VarChar, Tournament_ID)
                .query("INSERT INTO Stage (Name, Tournament_ID) VALUES (@Name, @Tournament_ID)");
            if (add_stage.rowsAffected[0] == 1) {
                console.log("Stage added");
                result++;
            }
        }
        if (result == length) {
            return 1;
        }
        return 0;

    }

    private async addTeamsToTournament(TeamList: string[], TournamentCode: string): Promise<number> {
        const length = TeamList.length;
        let result = 0;
        for (let i = 0; i < length; i++) {
            const add_team = await this.pool.request()
                .input('Id_Team', sql.Int, +TeamList[i])
                .input('TournamentCode', sql.VarChar, TournamentCode)
                .query("INSERT INTO COMPETE (Id_Team, TournamentCode) VALUES (@Id_Team, @TournamentCode)");
            if (add_team.rowsAffected[0] == 1) {
                console.log("Stage added");
                result++;
            }
        }
        if (result == length) {
            return 1;
        }
        return 0;
    }

    private deleteTournament = async (code: string): Promise<number> => {
        const delete_tournament = await this.pool.request()
            .input('CodeTournament', sql.VarChar, code)
            .query("DELETE FROM TOURNAMENT WHERE CodeTournament = @CodeTournament");
        return delete_tournament.rowsAffected[0];
    }

    private deleteStages = async (Stages: string[]): Promise<number> => {
        const length = Stages.length;
        let result = 0;
        for (let i = 0; i < length; i++) {
            const delete_stage = await this.pool.request()
                .input('id', sql.Int, +Stages[i])
                .query("DELETE FROM Stage WHERE Id = @id");
            if (delete_stage.rowsAffected[0] == 1) {
                console.log("Stage deleted");
                result++;
            }
        }
        if (result == length) {
            return 1;
        }
        return 0;

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
        const code = this.generateRandomCode(6);
        const new_tournament = await this.pool.request()
            .input('CodeTournament', sql.VarChar, code)
            .input('Name', sql.VarChar, Name)
            .input('StartDate', sql.Date, StartDate)
            .input('EndDate', sql.Date, EndDate)
            .input('Rules', sql.VarChar, Rules)
            .input('Type', sql.VarChar, Type)
            .query("INSERT INTO TOURNAMENT (CodeTournament, Name, StartDate, EndDate, Rules, Type)" +
                " OUTPUT Inserted.CodeTournament" +
                " VALUES (@CodeTournament, @Name, @StartDate, @EndDate, @Rules, @Type);");
        return new_tournament.recordset[0];
    }

    public async addTeamToTournament(Id_Team: number, TournamentCode: string): Promise<number> {
        const add_team = await this.pool.request()
            .input('Id_Team', sql.Int, Id_Team)
            .input('TournamentCode', sql.VarChar, TournamentCode)
            .query("INSERT INTO COMPETE (Id_Team, TournamentCode) VALUES (@Id_Team, @TournamentCode)");
        return add_team.rowsAffected[0];
    }

    public async addFullTournament(Name: string, StartDate: string, EndDate: string,
        Rules: string, Type: string, StageList: string[],
        TeamList: string[]): Promise<number> {
        const code = this.generateRandomCode(6);
        const new_tournament = await this.pool.request()
            .input('CodeTournament', sql.VarChar, code)
            .input('Name', sql.VarChar, Name)
            .input('StartDate', sql.Date, StartDate)
            .input('EndDate', sql.Date, EndDate)
            .input('Rules', sql.VarChar, Rules)
            .input('Type', sql.VarChar, Type)
            .query("INSERT INTO TOURNAMENT (CodeTournament, Name, StartDate, EndDate, Rules, Type)" +
                " OUTPUT Inserted.CodeTournament" +
                " VALUES (@CodeTournament, @Name, @StartDate, @EndDate, @Rules, @Type);");
        const addStages = await this.addStagesToTournament(StageList, code);
        const addTeams = await this.addTeamsToTournament(TeamList, code);
        if (new_tournament.rowsAffected[0] == 1 && addStages == 1 && addTeams == 1) {
            return new_tournament.recordset[0];
        } else {
            await this.deleteTournament(code);
            await this.deleteStages(StageList);
            return 0;
        }
    }
}