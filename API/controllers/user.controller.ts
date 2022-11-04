import { UserRepository } from '../repositories/user.repository';
import { IUserRepository } from '../repositories/interfaces/user.interface';
import { Response, Request } from 'express';
import { poolPromise } from '../loaders/db';

class UserController {

    /**
     * Get all users from the database and return them as a JSON object.
     * @param {Request} req - Request - This is the request object that is passed to the function.
     * @param {Response} res - Response - this is the response object that will be sent back to the
     * client.
     * @returns list of users.
     * 
     */
    static async getUsers(req: Request, res: Response) {
        try {
            const pool = await poolPromise;
            const userRepository: IUserRepository = new UserRepository(pool);
            const users = await userRepository.getUsers();
            res.status(200).json(users);
            return users;
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    }

    /**
     * It creates a user in the database.
     * @param {Request} req - Request, res: Response
     * @param {Response} res - Response
     */
    static async createUser(req: Request, res: Response) {
        try {
            const { Name, FirstSurname, SecondSurname,
                Nationality, Email, Password, Birthdate } = req.body;
            if (Name == null || FirstSurname == null || SecondSurname == null
                || Nationality == null || Email == null || Password == null
                || Birthdate == null) {
                res.status(400).json({ message: "Missing parameters" });
            }
            else {
                const pool = await poolPromise;
                const userRepository: IUserRepository = new UserRepository(pool);
                const result = await userRepository.createUser(Name, FirstSurname, SecondSurname,
                    Nationality, Email, Password, Birthdate);
                if (result == 1) {
                    res.status(200).json(result);
                }
            }
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    }

    /**
     * It takes in a request and a response, and then it tries to get the email and password from the
     * request body, then it creates a new user repository, and then it tries to login the user, and if
     * the user exists, it returns the user in the response.
     * @param {Request} req - Request - The request object
     * @param {Response} res - Response - this is the response object that will be sent back to the
     * client.
     */
    static async login(req: Request, res: Response) {
        try {
            const { Email, Password } = req.body;
            if (Email == null || Password == null) {
                res.status(400).json({ message: "Missing parameters" });
            } else {
                const pool = await poolPromise;
                const userRepository: IUserRepository = new UserRepository(pool);
                const user = await userRepository.login(Email, Password);
                if (user) {
                    res.status(200).json(user);
                }
            }
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    }

    /**
     * It gets a user by id from the database and returns it as a json object.
     * @param {Request} req - Request - this is the request object that is passed to the function.
     * @param {Response} res - Response - this is the response object that will be returned to the
     * client.
     * @returns The user object is being returned.
     */
    static async getUserById(req: Request, res: Response) {
        try {
            let id = req.params.id || {}
            const pool = await poolPromise;
            const userRepository: IUserRepository = new UserRepository(pool);
            const user = await userRepository.getUserById(+id);
            res.status(200).json(user);
            return user;
        } catch (error) {
            res.status(500);
            console.log(error);
        }
    }
}

export default UserController;