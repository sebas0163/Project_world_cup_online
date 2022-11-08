import { Prediction } from "../../models/prediction";

export interface IPredictionRepository {
    getPredictions(): Promise<Prediction[]>;
    createPrediction(Home_Score: number, Visit_Score: number, Best_player: number,
        Id_user: number, Id_match: number): Promise<number>;
}