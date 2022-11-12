import { Prediction } from "../../models/prediction";

export interface IPredictionRepository {
    getPredictions(): Promise<Prediction[]>;
    createPrediction(Home_Score: number, Visit_Score: number,
        Best_player: number, Id_user: number, Id_match: number,
        PredictionList: {
            Player_Id: string, Goals: string, Assists: string
        }[]): Promise<number>;
    getPredictionsByUser(userId: number): Promise<Prediction[]>;
    getFullPredictions(id: number): Promise<{
        Player_Id: string,
        Goals: string, Assists: string, Id_prediction: number
    }[]>;
}