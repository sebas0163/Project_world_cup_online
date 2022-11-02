import express from "express";
import credentials from "./middleware/credentials";
import cors from "cors";
import bodyParser from "body-parser";
import corsOptions from "./config/corsOptions";
import matchRoute from "./routes/match.route";
import tournamentRoute from "./routes/tournament.route";
import stageRoute from "./routes/stage.route";
import teamRoute from "./routes/team.route";

const app = express();
const apiString = "/api/v1/";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.json())

app.use(apiString + "match", matchRoute);
app.use(apiString + "tournament", tournamentRoute);
app.use(apiString + "stage", stageRoute);
app.use(apiString + "team", teamRoute);
app.use("*", (req: any, res: any) => res.status(404).json({ error: "not found" }))

export default app;
