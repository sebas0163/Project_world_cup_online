import { poolPromise } from '../loaders/db';
import { Response, Request } from 'express';
import { PredictionRepository } from '../repositories/prediction.repository';
import { IPredictionRepository } from '../repositories/interfaces/prediction.interface';

export default class PredictionController {

    static async getPredictions(req: Request, res: Response) {
        try {
            const pool = await poolPromise;
            const predictionRepository: IPredictionRepository = new PredictionRepository(pool);
            const predictions = await predictionRepository.getPredictions();
            res.status(200).json(predictions);
            return predictions;
        } catch (err) {
            res.status(500);
            console.log(err);
        }
    }

    static async getPredictionsByUser(req: Request, res: Response) {
        try {
            const id = req.params.id || {};
            const pool = await poolPromise;
            const predictionRepository: IPredictionRepository = new PredictionRepository(pool);
            const predictions = await predictionRepository.getPredictionsByUser(+id);
            res.status(200).json(predictions);
        } catch (err) {
            res.status(500);
            console.log(err);
        }
    }

    static async getFullPredictions(req: Request, res: Response) {
        try {
            const id = req.params.id || {};
            const pool = await poolPromise;
            const predictionRepository: IPredictionRepository = new PredictionRepository(pool);
            const predictions = await predictionRepository.getFullPredictions(+id);
            res.status(200).json(predictions);
        } catch (err) {
            res.status(500);
            console.log(err);
        }
    }

    static async createPrediction(req: Request, res: Response) {
        try {
            const { Home_Score, Visit_Score, Best_player, Id_user, Id_match,
                GoalList } = req.body;
            console.log("predic body",req.body)
            if (!Best_player || !Id_user || !Id_match) {
                res.status(400).json({ msg: 'Please enter all fields' });
                return;
            }
            const pool = await poolPromise;
            const predictionRepository: IPredictionRepository = new PredictionRepository(pool);
            const result = await predictionRepository.createPrediction(+Home_Score, +Visit_Score,
                +Best_player, +Id_user, +Id_match, GoalList);
            res.status(200).json(result);
        }
        catch (err) {
            res.status(500);
            console.log(err);
        }
    }
}
