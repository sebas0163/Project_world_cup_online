import { Response, Request } from 'express';
import { validateBody } from '../utils';
import { AdminRepository } from '../repositories/admin.repository';
import { IAdminRepository } from '../repositories/interfaces/admin.interface';

const adminRepository: IAdminRepository = new AdminRepository();

export default class AdminController {

    static async login(req: Request, res: Response) {
        try {
            const { Email, Password } = req.body;
            if (!validateBody(req.body, ['Email', 'Password'])) {
                res.status(400).json({ message: "Missing parameters" });
            }
            else {
                const admin = await adminRepository.login(Email, Password);
                if (admin) {
                    res.status(200).json(admin);
                }
                else {
                    res.status(404).json({ message: "User not found" });
                }
            }
        } catch (error) {
            res.status(500).json({ message: "Error" });
            console.log(error);
        }
    }

}