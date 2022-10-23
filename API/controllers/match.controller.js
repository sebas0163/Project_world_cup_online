var config = require('../config/dbconfig');
const sql = require('mssql');
const Match = require('../models/match');

class MatchController {

    static async getMatches(req, res) {
        try {
            let pool = await sql.connect(config);
            let matches = await pool.request().query("SELECT * FROM Match");
            res.status(200).json(matches.recordsets);
            return matches.recordsets;
        } catch (error) {
            console.log(error);
        }
    }

    static async getMatchById(req, res) {
        try {
            let id = req.params.id || {}
            let pool = await sql.connect(config);
            let match = await pool.request()
                .input('input_parameter', sql.Int, +id)
                .query("SELECT * FROM Match WHERE Id = @input_parameter");
            res.status(200).json(match.recordsets);
            return match.recordsets;
        } catch (error) {
            console.log(error);
        }
    }


    static async createMatch(req, res) {
        try {
            const { Stadium, Team1, Team2, StartDateTime,
                State, Score, Tournament_ID, Stage_ID } = req.body;
            let pool = await sql.connect(config);
            let match = await pool.request()
                .input('Stadium', sql.VarChar, Stadium)
                .input('Team1', sql.VarChar, Team1)
                .input('Team2', sql.VarChar, Team2)
                .input('StartDateTime', sql.DateTime, StartDateTime)
                .input('State', sql.VarChar, State)
                .input('Score', sql.VarChar, Score)
                .input('Tournament_ID', sql.VarChar, Tournament_ID)
                .input('Stage_ID', sql.VarChar, Stage_ID)
                .query("INSERT INTO Match (Stadium, Team1, Team2, StartDateTime, State, Score, Tournament_ID, Stage_ID) VALUES (@Stadium, @Team1, @Team2, @StartDateTime, @State, @Score, @Tournament_ID, @Stage_ID)");
            res.status(200).json("Match created -> " + Team1 + " vs " + Team2);
        } catch (error) {
            console.log(error);

        }

    }
}

module.exports = MatchController;
