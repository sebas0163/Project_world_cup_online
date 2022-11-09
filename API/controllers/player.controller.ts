import { poolPromise } from '../loaders/db';
import { Response, Request } from 'express';
import { PlayerRepository } from '../repositories/player.repository';
import { IPlayerRepository } from '../repositories/interfaces/player.interface';

export default class PlayerController {

    static async getPlayers(req: Request, res: Response) {
        try {
            const pool = await poolPromise;
            const playerRepository: IPlayerRepository = new PlayerRepository(pool);
            const players = await playerRepository.getPlayers();
            res.status(200).json(players);
            return players;
        } catch (err) {
            res.status(500);
            console.log(err);
        }
    }

    static async getPlayersByTeam(req: Request, res: Response) {
        try {
            const id_team = req.params.id || {};
            const pool = await poolPromise;
            const playerRepository: IPlayerRepository = new PlayerRepository(pool);
            const players = await playerRepository.getPlayersByTeam(+id_team);
            res.status(200).json(players);
            return players;
        } catch (err) {
            res.status(500);
            console.log(err);
        }
    }

}