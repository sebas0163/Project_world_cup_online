import sql from 'mssql';
import { Prediction } from '../models/prediction';


export class PredictionRepository {
    private pool: sql.ConnectionPool;
    constructor(pool: sql.ConnectionPool) {
        this.pool = pool;
    }

    public async getPredictions(): Promise<Prediction[]> {
        const result = await this.pool.request().query("SELECT * FROM PREDICTION");
        return result.recordset;
    }

    public async getPredictionsByUser(userId: number): Promise<Prediction[]> {
        const result = await this.pool.request()
            .input('input_parameter', sql.Int, userId)
            .query("SELECT * FROM PREDICTION WHERE Id_user = @input_parameter");
        return result.recordset;
    }

    public async getFullPredictions(id: number): Promise<{
        Player_Id: string,
        Goals: string, Assists: string, Id_prediction: number
    }[]> {
        const result = await this.pool.request()
            .input('input_parameter', sql.Int, id)
            .query("SELECT * FROM PLAYERS_PREDICTION WHERE Id_prediction = @input_parameter");
        return result.recordset;
    }

    private async addGoalPrediction(PredictionList: {
        Player_Id: string, Goals: string, Assists: string
    }[], Id_prediction: number): Promise<number> {

        const length = PredictionList.length;
        let result = 0;
        for (let i = 0; i < length; i++) {
            const add_goal_prediction = await this.pool.request()
                .input('Player_Id', sql.Int, +PredictionList[i].Player_Id)
                .input('Goals', sql.Int, +PredictionList[i].Goals)
                .input('Assists', sql.Int, +PredictionList[i].Assists)
                .input('Id_prediction', sql.Int, Id_prediction)
                .query("INSERT INTO PLAYERS_PREDICTION (Player_Id, Goals, Assists, Id_prediction) " +
                    "VALUES (@Player_Id, @Goals, @Assists, @Id_prediction)");
            if (add_goal_prediction.rowsAffected[0] == 1) {
                console.log("Goal prediction added");
                result++;
            }
        }
        if (result == length) {
            return 1;
        }
        return 0;

    }

    private async deletePrediction(id: number): Promise<number> {
        const delete_prediction = await this.pool.request()
            .input('Id', sql.Int, id)
            .query("DELETE FROM PREDICTION WHERE Id = @Id");
        return delete_prediction.rowsAffected[0];
    }

    public async createPrediction(Home_Score: number, Visit_Score: number,
        Best_player: number, Id_user: number, Id_match: number,
        PredictionList: {
            Player_Id: string, Goals: string, Assists: string
        }[]): Promise<number> {
        const result = await this.pool.request()
            .input('Home_Score', sql.Int, Home_Score)
            .input('Visit_Score', sql.Int, Visit_Score)
            .input('Best_player', sql.Int, Best_player)
            .input('Id_user', sql.Int, Id_user)
            .input('Id_match', sql.Int, Id_match)
            .query("INSERT INTO PREDICTION (Home_Score, Visit_Score, Best_player, Id_user, Id_match)" +
                " OUTPUT Inserted.Id" +
                " VALUES (@Home_Score, @Visit_Score, @Best_player, @Id_user, @Id_match)");
        const id_prediction = result.recordset[0].Id;
        console.log(id_prediction);
        var addGoalPrediction = 1;
        console.log("predi lenght",PredictionList.length)
        if (PredictionList.length != 0){
            addGoalPrediction = await this.addGoalPrediction(PredictionList, id_prediction);
        }
        if (addGoalPrediction == 1) {
            return id_prediction;
        } else {
            await this.deletePrediction(id_prediction);
            return 0;
        }
    }

}