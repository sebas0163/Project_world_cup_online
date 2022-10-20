const express = require('express');
const router = express.Router();
const matchController = require('../controllers/match.controller');

router
    .route('/')
    .get(matchController.getMatches);

module.exports = router;