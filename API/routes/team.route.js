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

router
    .route('/type/:type')
    .get(TeamController.getTeamsByType)

module.exports = router;