import { poolPromise } from '../loaders/db';
import { IMatchRepository } from '../repositories/interfaces/match.interface';
import { MatchRepository } from '../repositories/match.repository';

class MatchController {

    /**
     * It gets all the matches from the database and returns them as a JSON object.
     * @param {Request} req - Request - this is the request object that is passed to the function.
     * @param {any} res - any
     */
    static async getMatches(req: any, res: any) {
        try {
            const pool = await poolPromise;
            const matchRepository: IMatchRepository = new MatchRepository(pool);
            const matches = await matchRepository.getMatches();
            res.status(200).json(matches);
            return matches;
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    }

    /**
     * It takes an id and returns the match resulted.
     * @param req - The request object.
     * @param res - the response object
     * @returns A match.
     */
    static async getMatchById(req: any, res: any) {
        try {
            let id = req.params.id || {}
            const pool = await poolPromise;
            const matchRepository: IMatchRepository = new MatchRepository(pool);
            const match = await matchRepository.getMatchById(+id);
            res.status(200).json(match);
            return match;
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    }

    /**
     * It takes a tournament id as a parameter, and returns all matches that are associated with that
     * tournament id.
     * @param req - The request object
     * @param res - the response object
     * @returns An array of objects(matches).
     */
    static async getMatchesByTournamentCode(req: any, res: any) {
        try {
            let code = req.params.id || {}
            const pool = await poolPromise;
            const matchRepository: IMatchRepository = new MatchRepository(pool);
            const matches = await matchRepository.getMatchesByTournamentCode(code);
            res.status(200).json(matches);
            return matches;
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    }

    /**
     * It takes a stage id, and returns all matches that have that stage id.
     * @param req - request
     * @param res - the response object
     * @returns An array of objects(matches).
     */
    static async getMatchesByStageId(req: any, res: any) {
        try {
            let id = req.params.id || {}
            const pool = await poolPromise;
            const matchRepository: IMatchRepository = new MatchRepository(pool);
            const matches = await matchRepository.getMatchesByStageId(+id);
            res.status(200).json(matches);
            return matches;
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    }

    /**
     * It takes a Match as a request and inserts it into the database
     * @param req - The request object.
     * @param res - the response object
     */
    static async createMatch(req: any, res: any) {
        try {
            const { Stadium, StartDateTime,
                State, Score, Tournament_ID, Stage_ID, HomeId, VisitId } = req.body;
            const pool = await poolPromise;
            const matchRepository: IMatchRepository = new MatchRepository(pool);

            if (Stadium == null || StartDateTime == null ||
                State == null || HomeId == null || VisitId == null || Score == null || Tournament_ID == null || Stage_ID == null) {
                res.status(400).send("Please fill all the fields");
            } else {
                const match_id = await matchRepository.createMatch(Stadium, StartDateTime,
                    State, Score, Tournament_ID, Stage_ID, HomeId, VisitId);

                res.status(200).json(match_id);
            }
        } catch (error) {
            res.status(500);
            console.log(error);

        }

    }


    /**
     * It takes the Id_Team and Id_Match from the body of the request, creates a new instance of the
     * MatchRepository class, and then calls the addTeamToMatch function on that instance.
     * @param {any} req - any, res: any
     * @param {any} res - any -&gt; the response object
     */
    static async addTeamToMatch(req: any, res: any) {
        try {
            const { Id_Team, Id_Match } = req.body;
            const pool = await poolPromise;
            const matchRepository: IMatchRepository = new MatchRepository(pool);
            if (Id_Team == null || Id_Match == null) {
                res.status(400).send("Please fill all the fields");
            } else {
                const result = await matchRepository.addTeamToMatch(Id_Team, Id_Match);
                if (result == 1) {
                    res.status(200).json("Team added to match");
                }
            }
        } catch (error) {
            res.status(500);
            console.log(error);

        }
    }
}

export default MatchController;
