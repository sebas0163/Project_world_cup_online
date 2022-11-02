import express from 'express';
const router = express.Router();
import StageController from '../controllers/stage.controller';

router
    .route('/')
    .get(StageController.getStages)
    .post(StageController.createStage)

router
    .route('/:id')
    .get(StageController.getStageById)

router
    .route('/tournament/:id')
    .get(StageController.getStagesByTournamentId)


export default router;