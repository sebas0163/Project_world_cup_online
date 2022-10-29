const express = require('express');
const router = express.Router();
const MatchController = require('../controllers/match.controller');
const { route } = require('./team.route');

router
    .route('/')
    .get(MatchController.getMatches)
    .post(MatchController.createMatch)

router
    .route('/:id')
    .get(MatchController.getMatchById)

router
    .route('/tournament/:id')
    .get(MatchController.getMatchesByTournamentId)

router
    .route('/stage/:id')
    .get(MatchController.getMatchesByStageId)

router
    .route('/add')
    .post(MatchController.addTeamToMatch)

module.exports = router;