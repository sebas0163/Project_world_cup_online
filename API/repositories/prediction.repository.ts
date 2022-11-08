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

    public async createPrediction(Home_Score: number, Visit_Score: number, Best_player: number,
        Id_user: number, Id_match: number): Promise<number> {
        const result = await this.pool.request()
            .input('Home_Score', sql.Int, Home_Score)
            .input('Visit_Score', sql.Int, Visit_Score)
            .input('Best_player', sql.Int, Best_player)
            .input('Id_user', sql.Int, Id_user)
            .input('Id_match', sql.Int, Id_match)
            .query("INSERT INTO PREDICTION (Home_Score, Visit_Score, Best_player, Id_user, Id_match) VALUES (@Home_Score, @Visit_Score, @Best_player, @Id_user, @Id_match)");
        return result.rowsAffected[0];
    }

}