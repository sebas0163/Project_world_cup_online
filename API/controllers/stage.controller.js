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
                .input('input_parameter', sql.Int, +id)
                .query("SELECT * FROM STAGE WHERE Id = @input_parameter");
            res.status(200).json(stage.recordsets);
            return stage.recordsets;
        } catch (error) {
            console.log(error);
        }
    }

    static async getStageByTournamentId(req, res) {
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


    static async createStage(req, res) {
        try {
            const { Name, Tournament_ID } = req.body;
            //console.log(newStage);
            let pool = await sql.connect(config);
            let stage = await pool.request()
                .input('Name', sql.VarChar, Name)
                .input('Tournament_ID', sql.VarChar, Tournament_ID)
                .query("INSERT INTO Stage (Name, Tournament_ID) VALUES (@Name, @Tournament_ID)");
            res.status(200).json("Stage " + Name + " created");
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = StageController;