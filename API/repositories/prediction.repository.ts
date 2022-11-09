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

    private async addGoalPrediction(GoalList: { Goal_Scorer: string, Attendee: string }[],
        Id_prediction: number): Promise<number> {
        const length = GoalList.length;
        let result = 0;
        for (let i = 0; i < length; i++) {
            const assister = GoalList[i].Attendee;
            if (assister == null) {
                const add_goal_prediction = await this.pool.request()
                    .input('Goal_Scorer', sql.Int, +GoalList[i].Goal_Scorer)
                    .input('Id_prediction', sql.Int, Id_prediction)
                    .query("INSERT INTO GOAL_PREDICTION (Goal_Scorer, Id_prediction) VALUES (@Goal_Scorer, @Id_prediction)");
                if (add_goal_prediction.rowsAffected[0] == 1) {
                    console.log("Goal prediction added");
                    result++;
                } else {
                    return 0;
                }
            } else {
                const add_goal_prediction = await this.pool.request()
                    .input('Goal_Scorer', sql.Int, +GoalList[i].Goal_Scorer)
                    .input('Attendee', sql.Int, +GoalList[i].Attendee)
                    .input('Id_prediction', sql.Int, Id_prediction)
                    .query("INSERT INTO GOALS_PREDICTION (Goal_Scorer, Attendee, Id_prediction) VALUES (@Goal_Scorer, @Attendee, @Id_prediction)");
                if (add_goal_prediction.rowsAffected[0] == 1) {
                    console.log("Goal prediction added");
                    result++;
                } else {
                    return 0;
                }
            }
        }
        if (result == length) {
            return 1;
        } else {
            return 0;
        }

    }

    private async deletePrediction(id: number): Promise<number> {
        const delete_prediction = await this.pool.request()
            .input('Id', sql.Int, id)
            .query("DELETE FROM PREDICTION WHERE Id = @Id");
        return delete_prediction.rowsAffected[0];
    }

    public async createPrediction(Home_Score: number, Visit_Score: number,
        Best_player: number, Id_user: number, Id_match: number,
        GoalList: { Goal_Scorer: string, Attendee: string }[]): Promise<number> {
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
        const addGoalPrediction = await this.addGoalPrediction(GoalList, id_prediction);
        if (addGoalPrediction == 1) {
            return id_prediction;
        } else {
            await this.deletePrediction(id_prediction);
            return 0;
        }
    }

}