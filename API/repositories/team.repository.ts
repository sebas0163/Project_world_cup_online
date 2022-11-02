import sql from 'mssql';
import { Team } from '../models/team';

export class TeamRepository {

    private pool: sql.ConnectionPool;

    constructor(pool: sql.ConnectionPool) {
        this.pool = pool;
    }

    public async getTeams(): Promise<Team[]> {
        const result = await this.pool.request().query('SELECT * FROM Team');
        return result.recordset;
    }
}