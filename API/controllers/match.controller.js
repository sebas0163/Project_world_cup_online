var config = require('../config/dbconfig');
const sql = require('mssql');
const Match = require('../models/match');

class MatchController {

    static async getMatches() {
        try {
            let pool = await sql.connect(config);
            let matches = await pool.request().query("SELECT * FROM Matches");
            return matches.recordsets;
        } catch (error) {
            console.log(error);
        }
    }

    // static async createMatch(req, res) {
    //     try{
    //         const newMatch = new Match(req.body);
    //         let pool = await sql.connect(config);
    //         let match = await pool.request()
    //             .input('Id', sql.VarChar, newMatch.Id)

    //     }
}

module.exports = MatchController;
