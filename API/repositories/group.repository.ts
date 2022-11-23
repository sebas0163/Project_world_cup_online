import sql from 'mssql';
import { Group } from '../models/group';
import { generateRandomCode } from '../utils';

export class GroupRepository {

    public async getGroups(): Promise<Group[]> {
        const result = await new sql.Request().query('SELECT * FROM [Group]');
        return result.recordset;
    }

    public async getGroup(code: string): Promise<Group> {
        const result = await new sql.Request()
            .input('code', sql.VarChar, code)
            .query('SELECT * FROM [Group] WHERE Code = @code');
        return result.recordset[0];
    }

    public async joinGroup(Group_code: string, User_ID: number): Promise<number> {
        const result = await new sql.Request()
            .input('Group_code', sql.VarChar, Group_code)
            .input('User_ID', sql.Int, User_ID)
            .query('INSERT INTO USER_GROUP (Group_code, User_ID) VALUES (@Group_code, @User_ID)');
        return result.rowsAffected[0];
    }

    public async createGroup(User_ID: number, Name: string, Tournament_code: string): Promise<string> {
        const groupSingleCode = generateRandomCode(6);
        const Code = groupSingleCode + Tournament_code;
        const result = await new sql.Request()
            .input('code', sql.VarChar, Code)
            .input('name', sql.VarChar, Name)
            .input('tournament_code', sql.VarChar, Tournament_code)
            .query('INSERT INTO [Group] (Code, Name, Tournament_code)' +
                " OUTPUT Inserted.Code" +
                ' VALUES (@code, @name, @tournament_code)');
        const groupCode = result.recordset[0].Code;

        const addOwnerToGroup = await this.joinGroup(groupCode, User_ID);

        if (addOwnerToGroup == 1) {
            return groupCode;
        } else {
            return 'Error creando grupo';
        }
    }

}