import { TournamentRepository } from '../repositories/tournament.repository';
import { poolPromise } from '../loaders/db';
import { ITournamentRepository } from '../repositories/interfaces/tournament.interface';

class TournamentController {


    /**
     * This function gets all tournaments from the database and returns them as a JSON object.
     * @param {any} req - any - the request object
     * @param {any} res - any - the response object
     */
    static async getTournaments(req: any, res: any) {
        try {
            const pool = await poolPromise;
            const tournamentRepository: ITournamentRepository = new TournamentRepository(pool);
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
            const pool = await poolPromise
            const tournamentRepository: ITournamentRepository = new TournamentRepository(pool);
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
            const pool = await poolPromise
            const tournamentRepository: ITournamentRepository = new TournamentRepository(pool);
            if (Name == null || StartDate == null || EndDate == null || Type == null) {
                res.status(400).json({ message: "Bad request, missing parameters" });
            } else {

                const result = await tournamentRepository.createTournament(Name, StartDate, EndDate, Rules, Type);
                // if (result == 1) {
                //     res.status(200).json("Tournament " + Name + " created");
                //     return result;
                // }
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
            const pool = await poolPromise
            const tournamentRepository: ITournamentRepository = new TournamentRepository(pool);
            if (Id_Team == null || TournamentCode == null) {
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

}

export default TournamentController;
