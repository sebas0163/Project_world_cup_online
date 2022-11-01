import config from '../config/dbconfig';
import * as sql from 'mssql';
import Stage from '../models/stage';

class StageController {

    /**
     * It connects to the database, queries the database looking for all the stages, and returns the results.
     * @param req - The request object.
     * @param res - The response object.
     * @returns An array of objects(stages).
     */
    static async getStages(req: any, res: any) {
        try {
            let pool = await sql.connect(config);
            let stages = await pool.request().query("SELECT * FROM STAGE");
            res.status(200).json(stages.recordsets);
            return stages.recordsets;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * It takes an id an returns the stage associated with that id.
     * @param req - The request object
     * @param res - the response object
     * @returns An stage.
     */
    static async getStageById(req: any, res: any) {
        try {
            let id = req.params.id || {}
            let pool = await sql.connect(config);
            let stage = await pool.request()
                .input('input_parameter', sql.Int, +id)
                .query("SELECT * FROM STAGE WHERE Id = @input_parameter");
            res.status(200).json(stage.recordsets);
            return stage.recordsets;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * It takes a tournament id, and returns all the stages associated with that tournament.
     * @param req - request
     * @param res - the response object
     * @returns An array of objects(stages).
     */
    static async getStagesByTournamentId(req: any, res: any) {
        try {
            let id = req.params.id || {}
            let pool = await sql.connect(config);
            let stage = await pool.request()
                .input('input_parameter', sql.VarChar, id)
                .query("SELECT * FROM STAGE WHERE Tournament_ID = @input_parameter");
            res.status(200).json(stage.recordsets);
            return stage.recordsets;
        } catch (error) {
            console.log(error);
        }
    }


    /**
     * It takes the name and tournament ID from the body of the request, and inserts it into the
     * database as a new stage.
     * @param req - request
     * @param res - response
     */
    static async createStage(req: any, res: any) {
        try {
            const { Name, Tournament_ID } = req.body;
            //console.log(newStage);
            let pool = await sql.connect(config);
            if (Name == null || Tournament_ID == null) {
                res.status(400).json({ message: "Bad Request, Please fill all the fields" });
            } else {
                let stage = await pool.request()
                    .input('Name', sql.VarChar, Name)
                    .input('Tournament_ID', sql.VarChar, Tournament_ID)
                    .query("INSERT INTO Stage (Name, Tournament_ID) VALUES (@Name, @Tournament_ID)");
                res.status(200).json("Stage " + Name + " created");
            }
        } catch (error) {
            console.log(error);
        }
    }

}

export default StageController;