const express = require('express');
const router = express.Router();
const tournamentController = require('../controllers/tournament.controller');

router
    .route('/')
    .get(tournamentController.getTournaments);

module.exports = router;