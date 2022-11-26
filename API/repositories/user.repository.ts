import sql from 'mssql';
import { User } from '../models/user';

export class UserRepository {

    public async getUsers(): Promise<User[]> {
        const result = await new sql.Request().query("SELECT * FROM [USER]");
        return result.recordset;
    }

    public async getUserById(id: number): Promise<User> {
        const result = await new sql.Request()
            .input('input_parameter', sql.Int, id)
            .query("SELECT * FROM [USER] WHERE Id = @input_parameter");
        return result.recordset[0];
    }

    public async createUser(Name: string, Nickname: String,
        Email: string, Password: string, Birthdate: string): Promise<number> {
        const new_user = await new sql.Request()
            .input('Name', sql.VarChar, Name)
            .input('Nickname', sql.VarChar, Nickname)
            .input('Email', sql.VarChar, Email)
            .input('Password', sql.VarChar, Password)
            .input('Birthdate', sql.Date, Birthdate)
            .query("INSERT INTO [USER] ([Name], Nickname," +
                " Email, [Password], Birthdate)" + " VALUES (@Name, @Nickname," +
                " @Email, PWDENCRYPT(@Password), @Birthdate);");
        return new_user.rowsAffected[0];
    }

    public async login(email: string, password: string): Promise<User> {
        const result = await new sql.Request()
            .input('Email', sql.VarChar, email)
            .input('Password', sql.VarChar, password)
            .query("SELECT * FROM [USER] WHERE Email = @Email AND PWDCOMPARE(@Password,[Password]) = 1");
        return result.recordset[0];
    }

}