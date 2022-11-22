import { Group } from "../../models/group";

export interface IGroupRepository {
    getGroups(): Promise<Group[]>;
    getGroup(code: string): Promise<Group>;
    createGroup(User_ID: number, Name: string, Tournament_code: string): Promise<string>;
    joinGroup(Group_code: string, User_ID: number): Promise<number>;
}