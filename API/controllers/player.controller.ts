import { poolPromise } from '../loaders/db';
import { Response, Request } from 'express';
import { PlayerRepository } from '../repositories/player.repository';
import { IPlayerRepository } from '../repositories/interfaces/player.interface';

const playerRepository: IPlayerRepository = new PlayerRepository();

export default class PlayerController {

    /**
     * It gets all the players from the database and returns them in a JSON format.
     * @param {Request} req - Request - This is the request object that is passed to the route handler.
     * @param {Response} res - Response - this is the response object that will be sent back to the
     * client.
     * @returns the players array.
     */
    static async getPlayers(req: Request, res: Response) {
        try {
            const players = await playerRepository.getPlayers();
            res.status(200).json(players);
            return players;
        } catch (err) {
            res.status(500);
            console.log(err);
        }
    }

    /**
     * It's a function that takes a request and a response, and returns a promise that resolves to an
     * array of players.
     * @param {Request} req - Request - The request object.
     * @param {Response} res - Response - the response object
     * @returns The players that belong to the team with the id passed in the request.
     */
    static async getPlayersByTeam(req: Request, res: Response) {
        try {
            const id_team = req.params.id || {};
            const players = await playerRepository.getPlayersByTeam(+id_team);
            res.status(200).json(players);
            return players;
        } catch (err) {
            res.status(500);
            console.log(err);
        }
    }

}