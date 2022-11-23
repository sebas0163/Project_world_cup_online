import { IGroupRepository } from "../repositories/interfaces/group.interface";
import { GroupRepository } from "../repositories/group.repository";
import { validateBody } from "../utils";
import { Response, Request } from "express";

const groupRepository: IGroupRepository = new GroupRepository();

export default class GroupController {

    static async getGroups(req: Request, res: Response) {
        try {
            const groups = await groupRepository.getGroups();
            res.status(200).json(groups);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    }

    static async getGroup(req: Request, res: Response) {
        try {
            const code = req.params.code;
            const group = await groupRepository.getGroup(code);
            res.status(200).json(group);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    }

    static async createGroup(req: Request, res: Response) {
        try {
            const { User_ID, Name, Tournament_code } = req.body;
            if (!validateBody(req.body, ['User_ID', 'Name', 'Tournament_code'])) {
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }
            const code = await groupRepository.createGroup(+User_ID, Name, Tournament_code);
            res.status(200).json(code);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    }

    static async joinGroup(req: Request, res: Response) {
        try {
            const { Group_code, User_ID } = req.body;
            if (!validateBody(req.body, ['Group_code', 'User_ID'])) {
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }
            const rowsAffected = await groupRepository.joinGroup(Group_code, +User_ID);
            if (rowsAffected == 1) {
                res.status(200).json({ message: 'Joined group' });
            }
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    }

}