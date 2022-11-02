import express from 'express';
const router = express.Router();
import MatchController from '../controllers/match.controller';

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

export default router;