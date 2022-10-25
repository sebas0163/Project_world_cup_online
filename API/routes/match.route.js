const express = require('express');
const router = express.Router();
const MatchController = require('../controllers/match.controller');

router
    .route('/')
    .get(MatchController.getMatches)
    .post(MatchController.createMatch)

router
    .route('/:id')
    .get(MatchController.getMatchById)

router
    .route('/tournament/:id')
    .get(MatchController.getMatchByTournamentId)

router
    .route('/stage/:id')
    .get(MatchController.getMatchByStageId)

module.exports = router;