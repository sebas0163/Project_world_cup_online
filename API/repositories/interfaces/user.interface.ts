import { User } from "../../models/user";

export interface IUserRepository {
    getUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    createUser(Name: string, Nickname: string, Email: string, Password: string, Birthdate: string): Promise<number>;
    login(email: string, password: string): Promise<User>;
}