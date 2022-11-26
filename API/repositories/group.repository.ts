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

    public async joinGroup(Group_code: string, User_ID: number): Promise<{Group_code: string, User_ID: number}> {
        const result = await new sql.Request()
            .input('Group_code', sql.VarChar, Group_code)
            .input('User_ID', sql.Int, User_ID)
            .query('EXEC InsertGroup @User_ID, @Group_code');
        return result.recordset[0];
    }

    public async getGroupByTournament(code: string, user_id: number): Promise<{ Group_code: string }> {
        const result = await new sql.Request()
            .input("code", sql.VarChar, code)
            .input("user_id", sql.Int, user_id)
            .query("SELECT g.Code " +
                "FROM TOURNAMENT as t " +
                "INNER JOIN [GROUP] as g " +
                "ON t.CodeTournament = g.Tournament_code " +
                "INNER JOIN [USER_GROUP] as ug " +
                "ON ug.Group_code = g.Code " +
                "WHERE ug.[User_ID] = @user_id AND t.CodeTournament = @code");
        return result.recordset[0];
    }

    public async getOutOfGroup(User_ID: number, Group_code: string) {
        const result = await new sql.Request()
            .input('User_ID', sql.Int, User_ID)
            .input('Group_code', sql.VarChar, Group_code)
            .query('DELETE FROM [USER_GROUP] WHERE [User_ID] = @User_ID AND Group_code = @Group_code');
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

        if (!addOwnerToGroup) {
            return groupCode;
        } else {
            return 'Error creando grupo';
        }
    }

}