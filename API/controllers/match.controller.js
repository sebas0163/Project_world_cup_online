var config = require('../config/dbconfig');
const sql = require('mssql');

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
}

module.exports = MatchController;
