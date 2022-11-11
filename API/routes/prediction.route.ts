import express from 'express';
import PredictionController from '../controllers/prediction.controller';
const router = express.Router();

router
    .route('/')
    .get(PredictionController.getPredictions)
    .post(PredictionController.createPrediction)

router
    .route('/user/:id')
    .get(PredictionController.getPredictionsByUser)

router
    .route('/goals/:id')
    .get(PredictionController.getFullPredictions)

export default router;