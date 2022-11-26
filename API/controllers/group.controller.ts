import { IGroupRepository } from "../repositories/interfaces/group.interface";
import { GroupRepository } from "../repositories/group.repository";
import { validateBody } from "../utils";
import { Response, Request } from "express";

const groupRepository: IGroupRepository = new GroupRepository();

export default class GroupController {

    /**
     * It gets all the groups from the database and returns them in the response.
     * @param {Request} req - Request - this is the request object that is passed to the route handler.
     * @param {Response} res - Response - the response object
     */
    static async getGroups(req: Request, res: Response) {
        try {
            const groups = await groupRepository.getGroups();
            res.status(200).json(groups);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    }

    /**
     * It gets a group from the database based on the code passed in the request.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - the response object
     * @returns The group object
     */
    static async getGroup(req: Request, res: Response) {
        try {
            const code = req.params.code;
            const group = await groupRepository.getGroup(code);
            if (group == null) {
                res.status(404).json({ message: 'Group not found' });
            }
            res.status(200).json(group);
            return group;
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    }

    /**
     * It takes in a request, and a response, and then it tries to create a group. 
     * 
     * If it fails, it sends a 500 error. 
     * 
     * If it succeeds, it sends a 200 success. 
     * 
     * If it fails, it also logs the error to the console.
     * @param {Request} req - Request, res: Response
     * @param {Response} res - Response
     * @returns The code is being returned.
     */
    static async createGroup(req: Request, res: Response) {
        try {
            const { User_ID, Name, Tournament_code } = req.body;
            if (!validateBody(req.body, ['User_ID', 'Name', 'Tournament_code'])) {
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }
            const code = await groupRepository.createGroup(+User_ID, Name, Tournament_code);
            if (code === 'Error creando grupo') {
                res.status(400).json({ message: 'Error creando grupo' });
                return;
            }
            res.status(200).json(code);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    }

    /**
     * It takes a group code and a user ID, and if the group code exists, it adds the user ID to the
     * group.
     * @param {Request} req - Request
     * @param {Response} res - Response
     * @returns The number of rows affected.
     */
    static async joinGroup(req: Request, res: Response) {
        try {
            const { Group_code, User_ID } = req.body;
            if (!validateBody(req.body, ['Group_code', 'User_ID'])) {
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }
            const joinGroup = await groupRepository.joinGroup(Group_code, +User_ID);
            if (!joinGroup) {
                res.status(200).json({ message: 'Joined group' });
            }
            if (joinGroup) {
                res.status(404).json({ message: 'Group not found' });
            }
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    }

    /**
     * It gets the group by tournament code and user id.
     * @param {Request} req - Request, res: Response
     * @param {Response} res - Response
     */
    static async getGroupByTournament(req: Request, res: Response) {
        try {
            const code = req.params.code;
            const user_id = req.params.id;
            const group = await groupRepository.getGroupByTournament(code, +user_id);
            res.status(200).json(group);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    }

    /**
     * It deletes a user from a group.
     * @param {Request} req - Request, res: Response
     * @param {Response} res - Response
     */
    static async getOutOfGroup(req: Request, res: Response) {
        try {
            const code = req.params.code;
            const user_id = req.params.id;
            const rowsAffected = await groupRepository.getOutOfGroup(+user_id, code);
            if (rowsAffected == 1) {
                res.status(200).json({ message: 'Left group' });
            }
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    }

}