var config = require('../config/dbconfig');
const sql = require('mssql');
const Match = require('../models/match');

class MatchController {

    /**
     * It connects to the database, queries the database(looking for matches), and returns the results.
     * @param req - The request object.
     * @param res - The response object.
     * @returns All Matches.
     */
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

    /**
     * It takes an id and returns the macth resulted.
     * @param req - The request object.
     * @param res - the response object
     * @returns A match.
     */
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

    /**
     * It takes a tournament id as a parameter, and returns all matches that are associated with that
     * tournament id.
     * @param req - The request object
     * @param res - the response object
     * @returns An array of objects(matches).
     */
    static async getMatchesByTournamentId(req, res) {
        try {
            let id = req.params.id || {}
            let pool = await sql.connect(config);
            let match = await pool.request()
                .input('input_parameter', sql.VarChar, id)
                .query("SELECT * FROM Match WHERE Tournament_ID = @input_parameter ORDER BY StartDateTime ASC");
            res.status(200).json(match.recordsets);
            return match.recordsets;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * It takes a stage id, and returns all matches that have that stage id.
     * @param req - request
     * @param res - the response object
     * @returns An array of objects(matches).
     */
    static async getMatchesByStageId(req, res) {
        try {
            let id = req.params.id || {}
            let pool = await sql.connect(config);
            let match = await pool.request()
                .input('input_parameter', sql.Int, +id)
                .query("SELECT * FROM Match WHERE Stage_ID = @input_parameter ORDER BY StartDateTime ASC");
            res.status(200).json(match.recordsets);
            return match.recordsets;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * It takes a Match as a request and inserts it into the database
     * @param req - The request object.
     * @param res - the response object
     */
    static async createMatch(req, res) {
        try {
            const { Stadium, StartDateTime,
                State, Score, Tournament_ID, Stage_ID } = req.body;
            let pool = await sql.connect(config);
            if (Stadium == null || StartDateTime == null ||
                State == null || Score == null || Tournament_ID == null || Stage_ID == null) {
                res.status(400).send("Please fill all the fields");
            } else {
                let match = await pool.request()
                    .input('Stadium', sql.VarChar, Stadium)
                    .input('StartDateTime', sql.DateTime, StartDateTime)
                    .input('State', sql.VarChar, State)
                    .input('Score', sql.VarChar, Score)
                    .input('Tournament_ID', sql.VarChar, Tournament_ID)
                    .input('Stage_ID', sql.VarChar, Stage_ID)
                    .query("INSERT INTO Match (Stadium, StartDateTime, State, Score, Tournament_ID, Stage_ID) VALUES"
                        + " (@Stadium, @StartDateTime, @State, @Score, @Tournament_ID, @Stage_ID);" +
                        " SELECT SCOPE_IDENTITY() AS id;");
                res.status(200).json(match.recordsets[0][0].id);
                //return match.recordsets.Id
            }
        } catch (error) {
            console.log(error);

        }

    }

    static async addTeamToMatch(req, res) {
        try {
            const { Id_Team, Id_Match } = req.body;
            let pool = await sql.connect(config);
            if (Id_Team == null || Id_Match == null) {
                res.status(400).send("Please fill all the fields");
            } else {
                let match = await pool.request()
                    .input('Id_Team', sql.Int, +Id_Team)
                    .input('Id_Match', sql.Int, +Id_Match)
                    .query("INSERT INTO TEAM_MATCH (Id_Team, Id_Match) VALUES"
                        + " (@Id_Team, @Id_Match);");
                res.status(200).json("Team added to match");
            }
        } catch (error) {
            console.log(error);

        }
    }
}

module.exports = MatchController;
