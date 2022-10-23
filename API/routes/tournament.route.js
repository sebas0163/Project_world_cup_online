const express = require('express');
const router = express.Router();
const TournamentController = require('../controllers/tournament.controller');

router
    .route('/')
    .get(TournamentController.getTournaments)
    .post(TournamentController.createTournament)

router
    .route('/:id')
    .get(TournamentController.getTournamentById)

module.exports = router;