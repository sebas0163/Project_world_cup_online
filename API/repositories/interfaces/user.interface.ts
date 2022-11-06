import { User } from "../../models/user";

export interface IUserRepository {
    getUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    createUser(Name: string, FirstSurname: string, SecondSurname: string,
        Nationality: string, Email: string, Password: string, Birthdate: string): Promise<number>;
    login(email: string, password: string): Promise<User>;
}