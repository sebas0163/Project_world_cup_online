import { Response, Request } from 'express';
import { validateBody } from '../utils';
import { AdminRepository } from '../repositories/admin.repository';
import { IAdminRepository } from '../repositories/interfaces/admin.interface';

const adminRepository: IAdminRepository = new AdminRepository();

export default class AdminController {

    /**
     * It takes a request and a response, and then it tries to log in an admin.
     * 
     * If the request body is missing parameters, it returns a 400 error.
     * 
     * If the admin is found, it returns a 200 status code and the admin.
     * 
     * If the admin is not found, it returns a 404 status code and a message.
     * 
     * If there's an error, it returns a 500 status code and a message.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - The response object
     */
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