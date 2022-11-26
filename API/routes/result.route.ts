import express from 'express';
import ResultController from '../controllers/result.controller';

const router = express.Router();

router
    .route('/')
    .get(ResultController.getResults)
    .post(ResultController.postResult)

router
    .route('/match/:id')
    .get(ResultController.getResultByMatch)

router
    .route('/leaderboards/group/:code')
    .get(ResultController.getLeaderboardByGroup)
router
    .route('/leaderboards/tournament/:code')
    .get(ResultController.getLeaderboardByTournament)

export default router;