const express = require('express');
const router = express.Router();
const TeamController = require('../controllers/team.controller');

router
    .route('/')
    .get(TeamController.getTeams)
    .post(TeamController.createTeam)

router
    .route('/:id')
    .get(TeamController.getTeamsByTournamentId)

module.exports = router;