import { poolPromise } from '../loaders/db';
import { TeamRepository } from '../repositories/team.repository';
import { ITeamRepository } from '../repositories/interfaces/team.interface';

class TeamController {

    /**
     * Get all teams from the database and return them as a JSON object.
     * @param {any} req - any - the request object
     * @param {any} res - any - the response object
     */
    static async getTeams(req: any, res: any) {
        try {
            const pool = await poolPromise;
            const teamRepository: ITeamRepository = new TeamRepository(pool);
            const teams = await teamRepository.getTeams();

            res.status(200).json(teams);
            return teams

        } catch (error) {
            res.status(500);
            console.log(error);
        }
    }


    /**
     * It gets all the teams from the database that are associated with a tournament.
     * @param {any} req - any - the request object
     * @param {any} res - any - this is the response object that will be sent back to the client.
     */
    static async getTeamsByTournamentCode(req: any, res: any) {
        try {
            let id = req.params.id || {}
            const pool = await poolPromise;
            const teamRepository: ITeamRepository = new TeamRepository(pool);
            const teams = await teamRepository.getTeamsByTournamentCode(id);
            res.status(200).json(teams);
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    }

    /**
     * It takes a request and a response, and then it tries to create a team with the name and type that
     * are passed in the request body. 
     * 
     * If the name or type are null, it returns a 400 error. 
     * 
     * If the name and type are not null, it creates a team with the name and type that are passed in the
     * request body. 
     * 
     * If the team is created successfully, it returns a 200 status code and a message that says the team
     * was created successfully. 
     * 
     * If there's an error, it logs the error to the console.
     * @param req - The request object.
     * @param res - The response object.
     */
    static async createTeam(req: any, res: any) {
        try {
            const { Name, Type } = req.body;
            const pool = await poolPromise;
            const teamRepository: ITeamRepository = new TeamRepository(pool);
            if (Name == null || Type == null) {
                res.status(400).json({ message: "Please fill all fields" });
            } else {
                const result = await teamRepository.createTeam(Name, Type);
                if (result == 1) {
                    res.status(200).json({ message: Name + " created successfully" });
                }
            }
        }
        catch (error) {
            res.status(500);
            console.log(error);
        }
    }


    /**
     * It gets a list of teams by type.
     * @param {any} req - any, res: any
     * @param {any} res - any - the response object
     */
    static async getTeamsByType(req: any, res: any) {
        try {
            let type = req.params.type || {}
            const pool = await poolPromise;
            const teamRepository: ITeamRepository = new TeamRepository(pool);
            const teams = await teamRepository.getTeamsByType(type);
            res.status(200).json(teams);
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    }


    /**
     * It gets a team by id from the database and returns it to the user.
     * @param {any} req - any, res: any
     * @param {any} res - any - the response object
     */
    static async getTeamById(req: any, res: any) {
        try {
            let id = req.params.id || {}
            const pool = await poolPromise;
            const teamRepository: ITeamRepository = new TeamRepository(pool);
            const team = await teamRepository.getTeamById(+id);
            res.status(200).json(team);
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    }
}

export default TeamController;