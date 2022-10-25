var config = require('../config/dbconfig');
const sql = require('mssql');

class TournamentController {

    static async getTournaments(req, res) {
        try {
            let pool = await sql.connect(config);
            //console.log("Conneted to database");
            let tournaments = await pool.request().query("SELECT * FROM TOURNAMENT");
            //console.log(tournaments);
            res.status(200).json(tournaments.recordsets);
            return tournaments.recordsets;
        } catch (error) {
            console.log(error);
        }
    }

    static async getTournamentById(req, res) {
        try {
            let id = req.params.id || {}
            let pool = await sql.connect(config);
            let tournament = await pool.request()
                .input('input_parameter', sql.Int, +id)
                .query("SELECT * FROM TOURNAMENT WHERE Id = @input_parameter");
            res.status(200).json(tournament.recordsets);
            return tournament.recordsets;
        } catch (error) {
            console.log(error);
        }
    }

    static async createTournament(req, res) {
        try {
            const { Name, StartDate, EndDate, Rules, Type } = req.body;
            let pool = await sql.connect(config);
            //create a new tournament
            let tournament = await pool.request()
                .input('Name', sql.VarChar, Name)
                .input('StartDate', sql.Date, StartDate)
                .input('EndDate', sql.Date, EndDate)
                .input('Rules', sql.VarChar, Rules)
                .input('Type', sql.VarChar, Type)
                .query("INSERT INTO TOURNAMENT (Name, StartDate, EndDate, Rules, Type) VALUES (@Name, @StartDate, @EndDate, @Rules, @Type)");
            res.status(200).json("Tournament " + Name + " created");
        }
        catch (error) {
            console.log(error);
        }
    }

}

module.exports = TournamentController;
