var config = require('../config/dbconfig');
const sql = require('mssql');

class TeamController {

    /**
    * It connects to the database, queries the database(looking for teams), and returns the results.
    * @param req - The request object.
    * @param res - The response object.
    * @returns All Teams.
    */
    static async getTeams(req, res) {
        try {
            let pool = await sql.connect(config);
            let teams = await pool.request().query("SELECT * FROM Team");
            res.status(200).json(teams.recordsets);
            return teams.recordsets;
        } catch (error) {
            console.log(error);
        }
    }

    static async getTeamsByTournamentId(req, res) {
        try {
            let id = req.params.id || {}
            let pool = await sql.connect(config);
            let team = await pool.request()
                .input('input_parameter', sql.VarChar, id)
                //query to get all teams in a tournament joininng the team table
                //with the compete table
                .query("SELECT * FROM Team JOIN Compete ON Team.Id" +
                    "= Compete.Id_Team WHERE Compete.Tournament_ID = @input_parameter");
            res.status(200).json(team.recordsets);
            return team.recordsets;
        } catch (error) {
            console.log(error);
        }
    }

    static async createTeam(req, res) {
        try {
            const { Name, Type } = req.body;
            let pool = await sql.connect(config);
            if (Name == null || Type == null) {
                res.status(400).json({ message: "Please fill all fields" });
            } else {
                let team = await pool.request()
                    .input('Name', sql.VarChar, Name)
                    .input('Type', sql.VarChar, Type)
                    .query("INSERT INTO Team (Name,Type) VALUES (@Name,@Type)");
                res.status(200).json({ message: Name + " created successfully" });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = TeamController;