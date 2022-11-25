import sql from 'mssql';
import { Result } from '../models/result';

export class ResultRepository {

    public async getResults(): Promise<Result[]> {
        const result = await new sql.Request().query("SELECT * FROM RESULT");
        return result.recordset;
    }

    public async getResultByMatch(id: number): Promise<Result> {
        const result = await new sql.Request()
            .input('input_parameter', sql.Int, id)
            .query("SELECT * FROM RESULT WHERE Id_match = @input_parameter");
        return result.recordset[0];
    }

    private async addGoalResult(ResultList: {
        Player_Id: string, Goals: string, Assists: string
    }[], Id_result: number): Promise<number> {

        const length = ResultList.length;
        let result = 0;
        for (let i = 0; i < length; i++) {
            const add_goal_prediction = await new sql.Request()
                .input('Player_Id', sql.Int, +ResultList[i].Player_Id)
                .input('Goals', sql.Int, +ResultList[i].Goals)
                .input('Assists', sql.Int, +ResultList[i].Assists)
                .input('Id_prediction', sql.Int, Id_result)
                .query("INSERT INTO PLAYERS_RESULTS (Player_Id, Goals, Assists, Id_result) " +
                    "VALUES (@Player_Id, @Goals, @Assists, @Id_prediction)");
            if (add_goal_prediction.rowsAffected[0] == 1) {
                result++;
            }
        }
        if (result == length) {
            return 1;
        }
        return 0;

    }

    public async getLeaderboardByGroup(Group_code: string): Promise<Result[]> {
        const result = await new sql.Request()
            .input('Group_code', sql.VarChar, Group_code)
            .query("SELECT u.NickName,utp.Point " +
                "FROM [USER] as u " +
                "INNER JOIN USER_TOURNAMENT_POINTS as utp " +
                "ON u.Id = utp.[User_Id] " +
                "INNER JOIN USER_GROUP as up " +
                "ON up.[User_ID] = u.Id " +
                "WHERE up.Group_code = @Group_code");
        return result.recordset;
    }

    public async getLeaderboardByTournament(Tournament_code: string): Promise<Result[]> {
        const result = await new sql.Request()
            .input('Tournament_code', sql.VarChar, Tournament_code)
            .query("SELECT u.NickName,utp.Point " +
                "FROM [USER] as u " +
                "INNER JOIN USER_TOURNAMENT_POINTS as utp " +
                "ON u.Id = utp.[User_Id] " +
                "WHERE utp.Tournament_ID = @Tournament_code");
        return result.recordset;
    }

    private async assignPointsToUsers(Id_result: number, Tournament_code: string): Promise<number> {
        const result = await new sql.Request()
            .input('Id_result', sql.Int, Id_result)
            .input('Tournament_code', sql.VarChar, Tournament_code)
            .query("EXECUTE assignResults @Id_result, @Tournament_code");
        return result.rowsAffected[0];
    }

    public async postResult(Home_Score: number, Visit_Score: number,
        Best_player: number, Id_match: number, Id_Winner: number, Tournament_code: string,
        ResultList: {
            Player_Id: string, Goals: string, Assists: string
        }[]): Promise<number> {

        const result = await new sql.Request()
            .input('Home_Score', sql.Int, Home_Score)
            .input('Visit_Score', sql.Int, Visit_Score)
            .input('Best_player', sql.Int, Best_player)
            .input('Id_match', sql.Int, Id_match)
            .input('Id_Winner', sql.Int, Id_Winner)
            .query("INSERT INTO RESULT (Home_Score, Visit_Score, Best_player, Id_match, Id_Winner)" +
                " OUTPUT Inserted.Id" +
                " VALUES (@Home_Score, @Visit_Score, @Best_player, @Id_match, @Id_Winner);");
        const id_result = result.recordset[0].Id;
        const add_goal_result = await this.addGoalResult(ResultList, id_result);
        const assign_points = await this.assignPointsToUsers(id_result, Tournament_code);
        if (result.rowsAffected[0] == 1 && add_goal_result == 1 && assign_points == 1) {
            return result.recordset[0];
        } else {
            return 0;
        }
    }
}