import sql from 'mssql';
import { Stage } from '../models/stage';

export class StageRepository {
    private pool: sql.ConnectionPool;
    constructor(pool: sql.ConnectionPool) {
        this.pool = pool;
    }

    public async getStages(): Promise<Stage[]> {
        const result = await this.pool.request().query("SELECT * FROM STAGE");
        return result.recordset;
    }

    public async getStageById(id: Number): Promise<Stage> {
        const result = await this.pool.request()
            .input('input_parameter', sql.Int, +id)
            .query("SELECT * FROM STAGE WHERE Id = @input_parameter");
        return result.recordset[0];
    }

    public async getStagesByTournamentCode(code: string): Promise<Stage[]> {
        const result = await this.pool.request()
            .input('input_parameter', sql.VarChar, code)
            .query("SELECT * FROM STAGE WHERE Tournament_ID = @input_parameter");
        return result.recordset;
    }

    public async createStage(Name: string, Tournament_ID: string): Promise<number> {
        const new_stage = await this.pool.request()
            .input('Name', sql.VarChar, Name)
            .input('Tournament_ID', sql.VarChar, Tournament_ID)
            .query("INSERT INTO Stage (Name, Tournament_ID) VALUES (@Name, @Tournament_ID)");
        return new_stage.rowsAffected[0];
    }
}