import { Response, Request } from 'express';
import { validateBody } from '../utils';
import { IResultRepository } from '../repositories/interfaces/result.interface';
import { ResultRepository } from '../repositories/result.repository';

const resultRepository: IResultRepository = new ResultRepository();

export default class ResultController {

    /**
     * It gets the results from the database and returns them to the user.
     * @param {Request} req - Request - this is the request object that is passed to the route handler.
     * @param {Response} res - Response - this is the response object that will be sent back to the
     * client.
     * @returns The results of the query.
     */
    static async getResults(req: Request, res: Response) {
        try {
            const results = await resultRepository.getResults();
            res.status(200).json(results);
            return results;
        } catch (err) {
            res.status(500);
            console.log(err);
        }
    }

    /**
     * It takes a match id, and returns the result of that match.
     * @param {Request} req - Request - the request object
     * @param {Response} res - Response - the response object
     * @returns The result of the query.
     */
    static async getResultByMatch(req: Request, res: Response) {
        try {
            const id = req.params.id || {};
            const result = await resultRepository.getResultByMatch(+id);
            if (result == null) {
                res.status(404).json({ msg: 'Result not found' });
                return;
            }
            res.status(200).json(result);
            return result;
        } catch (err) {
            res.status(500);
            console.log(err);
        }
    }

    /**
     * It gets the leaderboard of a tournament by its code.
     * @param {Request} req - Request - the request object
     * @param {Response} res - Response - the response object
     * @returns The leaderboard is being returned.
     */
    static async getLeaderboardByTournament(req: Request, res: Response) {
        try {
            const code = req.params.code;
            const leaderboard = await resultRepository.getLeaderboardByTournament(code);
            if (leaderboard.length == 0) {
                res.status(404).json({ msg: 'Leaderboard not found' });
                return;
            }
            res.status(200).json(leaderboard);
            return leaderboard;
        } catch (err) {
            res.status(500);
            console.log(err);
        }
    }

    /**
     * It takes a group_id and a Group_name as parameters, and returns a leaderboard.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - the response object
     * @returns The leaderboard is being returned.
     */
    static async getLeaderboardByGroup(req: Request, res: Response) {
        try {
            const group_id = req.params.code;
            const Group_name: string = "";
            const leaderboard = await resultRepository.getLeaderboardByGroup(group_id, Group_name);
            if (leaderboard.length == 0) {
                res.status(404).json({ msg: 'Leaderboard not found' });
                return;
            }
            res.status(200).json(leaderboard);
            return leaderboard;
        } catch (err) {
            res.status(500);
            console.log(err);
        }
    }

    /**
     * It takes a request, validates the body, and then creates a new result.
     * @param {Request} req - Request
     * @param {Response} res - Response
     */
    static async postResult(req: Request, res: Response) {
        try {
            const { Home_Score, Visit_Score, Best_player, Id_match,
                Id_Winner, Tournament_code, GoalList } = req.body;
            if (!validateBody(req.body, ['Home_Score', 'Visit_Score', 'Best_player', 'Id_match', 'Id_Winner',
                'Tournament_code'])) {
                res.status(400).json({ msg: 'Please enter all fields' });
                return;
            }
            const result = await resultRepository.postResult(+Home_Score, +Visit_Score, +Best_player,
                +Id_match, +Id_Winner, Tournament_code, GoalList);
            res.status(200).json(result);
        } catch (err) {
            res.status(500);
            console.log(err);
        }
    }
}