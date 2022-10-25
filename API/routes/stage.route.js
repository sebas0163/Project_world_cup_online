const express = require('express');
const router = express.Router();
const StageController = require('../controllers/stage.controller');

router
    .route('/')
    .get(StageController.getStages)
    .post(StageController.createStage)

router
    .route('/:id')
    .get(StageController.getStageById)

router
    .route('/tournament/:id')
    .get(StageController.getStageByTournamentId)


module.exports = router;