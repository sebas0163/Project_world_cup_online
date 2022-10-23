var config = require('../config/dbconfig');
const sql = require('mssql');
const Stage = require('../models/stage');

class StageController {

    static async getStages(req, res) {
        try {
            let pool = await sql.connect(config);
            let stages = await pool.request().query("SELECT * FROM STAGE");
            res.status(200).json(stages.recordsets);
            return stages.recordsets;
        } catch (error) {
            console.log(error);
        }
    }

    static async getStageById(req, res) {
        try {
            let id = req.params.id || {}
            let pool = await sql.connect(config);
            let stage = await pool.request()
                .input('input_parameter', sql.VarChar, id)
                .query("SELECT * FROM STAGE WHERE Id = @input_parameter");
            res.status(200).json(stage.recordsets);
            return stage.recordsets;
        } catch (error) {
            console.log(error);
        }
    }

    static async createStage(req, res) {
        try {
            const { Id, Name, StartDate, EndDate, Tournament_ID } = req.body;
            //console.log(newStage);
            let pool = await sql.connect(config);
            let stage = await pool.request()
                .input('Id', sql.VarChar, Id)
                .input('Name', sql.VarChar, Name)
                .input('StartDate', sql.Date, StartDate)
                .input('EndDate', sql.Date, EndDate)
                .input('Tournament_ID', sql.VarChar, Tournament_ID)
                .query("INSERT INTO Stage (Id, Name, StartDate, EndDate, Tournament_ID) VALUES (@Id, @Name, @StartDate, @EndDate, @Tournament_ID)");
            res.status(200).json("Stage " + Name + " created");
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = StageController;