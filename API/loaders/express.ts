import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import corsOptions from "../config/corsOptions";
import credentials from "../middleware/credentials";
import matchRoute from "../routes/match.route";
import stageRoute from "../routes/stage.route";
import teamRoute from "../routes/team.route";
import tournamentRoute from "../routes/tournament.route";
import userRoute from "../routes/user.route";
import predictionRoute from "../routes/prediction.route";
import playerRoute from "../routes/player.route";
import { poolPromise } from "./db";
import resultRoute from "../routes/result.route";
import groupRoute from "../routes/group.route";
import adminRoute from "../routes/admin.route";

export class ExpressLoader {
    server: any;
    constructor() {
        dotenv.config()

        const port = process.env.PORT || 8000
        const app = express();
        const apiString = "/api/v1/";
        poolPromise;
        console.log("Connected to MSSQL");

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(credentials)
        app.use(cors(corsOptions))
        app.use(express.json())

        app.use(apiString + "match", matchRoute);
        app.use(apiString + "tournament", tournamentRoute);
        app.use(apiString + "stage", stageRoute);
        app.use(apiString + "team", teamRoute);
        app.use(apiString + "user", userRoute);
        app.use(apiString + "prediction", predictionRoute);
        app.use(apiString + "player", playerRoute);
        app.use(apiString + "result", resultRoute);
        app.use(apiString + "group", groupRoute);
        app.use(apiString + "admin", adminRoute);
        app.use("*", (req: any, res: any) => res.status(404).json({ error: "not found" }))

        this.server = app.listen(port, () => console.log(`Server running on port ${port}`));
    }

    get Server() {
        return this.server;
    }
}