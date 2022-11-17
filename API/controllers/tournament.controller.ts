import { TournamentRepository } from '../repositories/tournament.repository';
import { ITournamentRepository } from '../repositories/interfaces/tournament.interface';
import { validateBody } from '../utils';

const tournamentRepository: ITournamentRepository = new TournamentRepository();

class TournamentController {

    /**
     * This function gets all tournaments from the database and returns them as a JSON object.
     * @param {any} req - any - the request object
     * @param {any} res - any - the response object
     */
    static async getTournaments(req: any, res: any) {
        try {
            const tournaments = await tournamentRepository.getTournaments();
            res.status(200).json(tournaments);
            return tournaments;
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    }

    /**
     * It takes a tournament id, and returns the tournament with that id.
     * @param req - The request object
     * @param res - the response object
     * @returns A tournament.
     */
    static async getTournamentByCode(req: any, res: any) {
        try {
            let code = req.params.id || {}
            const tournament = await tournamentRepository.getTournamentByCode(code);
            res.status(200).json(tournament);
            return tournament;
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    }

    /**
     * It creates a new tournament in the database.
     * @param req - the request object
     * @param res - the response object
     */
    static async createTournament(req: any, res: any) {
        try {
            const { Name, StartDate, EndDate, Rules, Type } = req.body;
            if (!validateBody(req.body, ['Name', 'StartDate', 'EndDate', 'Type'])) {
                res.status(400).json({ message: "Bad request, missing parameters" });
            } else {
                const result = await tournamentRepository.createTournament(Name, StartDate, EndDate, Rules, Type);
                res.status(200).json(result);
                return result;
            }
        }
        catch (error) {
            res.status(500);
            console.log(error);
        }
    }


    /**
     * It adds a team to a tournament.
     * @param {any} req - any, res: any
     * @param {any} res - any =&gt; the response object
     */
    static async addTeamToTournament(req: any, res: any) {
        try {
            const { Id_Team, TournamentCode } = req.body;
            if (!validateBody(req.body, ['Id_Team', 'TournamentCode'])) {
                res.status(400).json({ message: "Bad request, missing parameters" });
            } else {
                const result = await tournamentRepository.addTeamToTournament(Id_Team, TournamentCode);
                if (result == 1) {
                    res.status(200).json("Team added to tournament");
                    return result;
                }
            }
        }
        catch (error) {
            res.status(500);
            console.log(error);
        }
    }

    /**
     * It takes a tournament object, and adds it to the database with all the stages and teams.
     * @param {any} req - any, res: any
     * @param {any} res - any - the response object
     * @returns The result of the query. The code of the tournament.
     */
    static async addFullTournament(req: any, res: any) {
        try {
            const { Name, StartDate, EndDate, Rules, Type, StageList, TeamList } = req.body;
            if (!validateBody(req.body, ['Name', 'StartDate', 'EndDate', 'Type', 'StageList', 'TeamList'])) {
                res.status(400).json({ message: "Bad request, missing parameters" });
            } else {
                const result = await tournamentRepository.addFullTournament(Name, StartDate, EndDate, Rules, Type, StageList, TeamList);
                res.status(200).json(result);
                return result;
            }
        }
        catch (error) {
            res.status(500);
            console.log(error);
        }
    }

}

export default TournamentController;
