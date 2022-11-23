import sql from 'mssql';
import { Admin } from '../models/admin';

export class AdminRepository {

    public async login(email: string, password: string): Promise<Admin> {
        const result = await new sql.Request()
            .input('Email', sql.VarChar, email)
            .input('Password', sql.VarChar, password)
            .query("SELECT * FROM [ADMIN] WHERE Email = @Email AND PWDCOMPARE(@Password,[Password]) = 1");
        return result.recordset[0];
    }
}