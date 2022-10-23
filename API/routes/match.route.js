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


module.exports = router;