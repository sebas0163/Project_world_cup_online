const express = require("express");
const credentials = require("./middleware/credentials");
const cors = require("cors");
const bodyParser = require("body-parser");
const corsOptions = require("./config/corsOptions");
const matchRoute = require("./routes/match.route");

const app = express();
const apiString = "/api/v1/";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.json())

app.use(apiString + "match", matchRoute);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

module.exports = (app);
