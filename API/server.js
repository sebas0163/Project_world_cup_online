const express = require("express");

const app = express();

app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

module.exports = (app);
