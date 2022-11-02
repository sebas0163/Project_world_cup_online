import config from '../config/dbconfig';
import sql from 'mssql';

class TournamentController {

    /**
     * It connects to the database, queries the database looking for all the tournaments, and returns the results.
     * @param req - The request object.
     * @param res - The response object.
     * @returns An array of objects(tournaments).
     */
    static async getTournaments(req: any, res: any) {
        try {
            let pool = await sql.connect(config);
            let tournaments = await pool.request().query("SELECT * FROM TOURNAMENT");
            res.status(200).json(tournaments.recordsets);
            return tournaments.recordsets;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * It takes a tournament id, and returns the tournament with that id.
     * @param req - The request object
     * @param res - the response object
     * @returns A tournament.
     */
    static async getTournamentById(req: any, res: any) {
        try {
            let id = req.params.id || {}
            let pool = await sql.connect(config);
            let tournament = await pool.request()
                .input('input_parameter', sql.VarChar, id)
                .query("SELECT * FROM TOURNAMENT WHERE CodeTournament = @input_parameter");
            res.status(200).json(tournament.recordsets);
            return tournament.recordsets;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * It creates a new tournament in the database.
     * @param req - the request object
     * @param res - the response object
     */
    static async createTournament(req: any, res: any) {
        try {
            const { Name, StartDate, EndDate, Rules, Type } = req.body;
            let pool = await sql.connect(config);
            if (Name == null || StartDate == null || EndDate == null || Type == null) {
                res.status(400).json({ message: "Bad request, missing parameters" });
            } else {
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
        }
        catch (error) {
            console.log(error);
        }
    }

    /**
     * It takes the Id_Team and TournamentCode from the body of the request, and inserts them into the
     * COMPETE table. In other words, adds the team to the tournament.
     * @param req - {
     * @param res - the response object
     */
    static async addTeamToTournament(req: any, res: any) {
        try {
            const { Id_Team, TournamentCode } = req.body;
            let pool = await sql.connect(config);
            if (Id_Team == null || TournamentCode == null) {
                res.status(400).json({ message: "Bad request, missing parameters" });
            } else {
                let tournament = await pool.request()
                    .input('Id_Team', sql.Int, Id_Team)
                    .input('TournamentCode', sql.VarChar, TournamentCode)
                    .query("INSERT INTO COMPETE (Id_Team, TournamentCode) VALUES (@Id_Team, @TournamentCode)");
                res.status(200).json("Team added to tournament");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

}

export default TournamentController;
