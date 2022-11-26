import { Response, Request } from 'express';
import { PredictionRepository } from '../repositories/prediction.repository';
import { IPredictionRepository } from '../repositories/interfaces/prediction.interface';
import { validateBody } from '../utils';

const predictionRepository: IPredictionRepository = new PredictionRepository();

export default class PredictionController {

    /**
     * It gets predictions from the database and returns them to the user.
     * @param {Request} req - Request - this is the request object that is passed to the function.
     * @param {Response} res - Response - the response object
     * @returns The predictions array.
     */
    static async getPredictions(req: Request, res: Response) {
        try {
            const predictions = await predictionRepository.getPredictions();
            res.status(200).json(predictions);
            return predictions;
        } catch (err) {
            res.status(500);
            console.log(err);
        }
    }

    /**
     * It gets predictions by user.
     * @param {Request} req - Request - this is the request object that is passed to the function.
     * @param {Response} res - Response - the response object
     * @returns The predictions are being returned.
     */
    static async getPredictionsByUser(req: Request, res: Response) {
        try {
            const id = req.params.id || {};
            const predictions = await predictionRepository.getPredictionsByUser(+id);
            res.status(200).json(predictions);
            return predictions;
        } catch (err) {
            res.status(500);
            console.log(err);
        }
    }

    /**
     * It gets the predictions from an id.
     * @param {Request} req - Request - this is the request object that is passed to the function.
     * @param {Response} res - Response - the response object
     */
    static async getFullPredictions(req: Request, res: Response) {
        try {
            const id = req.params.id || {};
            const predictions = await predictionRepository.getFullPredictions(+id);
            res.status(200).json(predictions);
        } catch (err) {
            res.status(500);
            console.log(err);
        }
    }

    /**
     * It creates a prediction in the database.
     * @param {Request} req - Request, res: Response
     * @param {Response} res - Response
     * @returns The result of the query.
     */
    static async createPrediction(req: Request, res: Response) {
        try {
            const { Home_Score, Visit_Score, Best_player, Id_user, Id_match,
                Id_Winner, GoalList } = req.body;
            if (!validateBody(req.body, ['Home_Score', 'Visit_Score', 'Best_player', 'Id_user',
                'Id_Winner', 'Id_match'])) {
                res.status(400).json({ msg: 'Please enter all fields' });
                return;
            }
            const result = await predictionRepository.createPrediction(+Home_Score, +Visit_Score,
                +Best_player, +Id_user, +Id_match, +Id_Winner, GoalList);
            res.status(200).json(result);
        }
        catch (err) {
            res.status(500);
            console.log(err);
        }
    }
}
