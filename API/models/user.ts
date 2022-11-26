import { Admin } from "./admin";

export interface User extends Admin {
    Id: number,
    Name: string,
    Nickname: string,
    Birthdate: string
}