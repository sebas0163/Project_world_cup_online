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

    static async getTournamentById(id) {
        try {
            let pool = await sql.connect(config);
            let tournament = await pool.request()
                .input('input_parameter', sql.Int, id)
                .query("SELECT * FROM Tournaments WHERE TournamentId = @input_parameter");
            return tournament.recordsets;
        } catch (error) {
            console.log(error);
        }
    }

    //static async createTournament() {

}

module.exports = TournamentController;
