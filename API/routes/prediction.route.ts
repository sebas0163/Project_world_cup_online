import express from 'express';
import PredictionController from '../controllers/prediction.controller';
const router = express.Router();

router
    .route('/')
    .get(PredictionController.getPredictions)
    .post(PredictionController.createPrediction)

export default router;