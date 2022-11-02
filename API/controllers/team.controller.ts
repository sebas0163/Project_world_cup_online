import config from '../config/dbconfig';
import sql from 'mssql';

class TeamController {

    /**
    * It connects to the database, queries the database(looking for teams), and returns the results.
    * @param req - The request object.
    * @param res - The response object.
    * @returns All Teams.
    */
    static async getTeams(req: any, res: any) {
        try {
            // let pool = new sql.ConnectionPool(config);
            // const poolConnect = pool.connect();
            // pool.on('error', err => {
            //     // ... error handler
            // });

            // await poolConnect;
            let pool = await sql.connect(config);
            let teams = await pool.request().query("SELECT * FROM Team");
            //res.status(200).json(teams.recordsets[]);
            res.status(200).json(teams.recordsets);
            //return teams.recordsets;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * It takes a tournament code as a parameter, and returns all the teams that are participating in
     * that tournament.
     * @param req - the request object
     * @param res - the response object
     * @returns An array of objects(teams).
     */
    static async getTeamsByTournamentId(req: any, res: any) {
        try {
            let id = req.params.id || {}
            let pool = await sql.connect(config);
            // console.log("Before query, id: " + id);
            let team = await pool.request()
                .input('input_parameter', sql.VarChar, id)
                .query("SELECT * FROM Team JOIN Compete ON Compete.Id_Team" +
                    " = Team.Id WHERE Compete.TournamentCode = @input_parameter");
            //res.status(200).json(team.recordsets[0]);
            res.status(200).json(team.recordsets);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * It takes a request and a response, and then it tries to create a team with the name and type that
     * are passed in the request body. 
     * 
     * If the name or type are null, it returns a 400 error. 
     * 
     * If the name and type are not null, it creates a team with the name and type that are passed in the
     * request body. 
     * 
     * If the team is created successfully, it returns a 200 status code and a message that says the team
     * was created successfully. 
     * 
     * If there's an error, it logs the error to the console.
     * @param req - The request object.
     * @param res - The response object.
     */
    static async createTeam(req: any, res: any) {
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

    /**
     * It takes a type, and then uses that type to query the database, then returns all the teams of that type.
     * @param req - The request object.
     * @param res - The response object.
     */
    static async getTeamsByType(req: any, res: any) {
        try {
            let type = req.params.type || {}
            let pool = await sql.connect(config);
            let team = await pool.request()
                .input('input_parameter', sql.VarChar, type)
                .query("SELECT * FROM Team WHERE Type = @input_parameter");
            //res.status(200).json(team.recordsets[0]);
            res.status(200).json(team.recordsets);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * It's a function that takes a request(id of team), and returns a team object from the
     * database.
     * @param req - The request object.
     * @param res - The response object.
     */
    static async getTeamById(req: any, res: any) {
        try {
            let id = req.params.id || {}
            let pool = await sql.connect(config);
            let team = await pool.request()
                .input('input_parameter', sql.Int, +id)
                .query("SELECT * FROM Team WHERE Id = @input_parameter");
            //res.status(200).json(team.recordsets[0]);
            res.status(200).json(team.recordsets);
        } catch (error) {
            console.log(error);
        }
    }
}

export default TeamController;