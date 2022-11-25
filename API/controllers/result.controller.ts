import { Response, Request } from 'express';
import { validateBody } from '../utils';
import { IResultRepository } from '../repositories/interfaces/result.interface';
import { ResultRepository } from '../repositories/result.repository';

const resultRepository: IResultRepository = new ResultRepository();

export default class ResultController {

    static async getResults(req: Request, res: Response) {
        try {
            const results = await resultRepository.getResults();
            res.status(200).json(results);
        } catch (err) {
            res.status(500);
            console.log(err);
        }
    }

    static async getResultByMatch(req: Request, res: Response) {
        try {
            const id = req.params.id || {};
            const result = await resultRepository.getResultByMatch(+id);
            res.status(200).json(result);
        } catch (err) {
            res.status(500);
            console.log(err);
        }
    }

    static async getLeaderboardByTournament(req: Request, res: Response) {
        try {
            const code = req.params.code;
            const leaderboard = await resultRepository.getLeaderboardByTournament(code);
            res.status(200).json(leaderboard);
        } catch (err) {
            res.status(500);
            console.log(err);
        }
    }

    static async getLeaderboardByGroup(req: Request, res: Response) {
        try {
            const group_id = req.params.code;
            const Group_name: string = "";
            const leaderboard = await resultRepository.getLeaderboardByGroup(group_id, Group_name);
            res.status(200).json(leaderboard);
        } catch (err) {
            res.status(500);
            console.log(err);
        }
    }

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