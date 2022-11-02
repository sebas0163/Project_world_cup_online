import express from 'express';
const router = express.Router();
import TournamentController from '../controllers/tournament.controller';

router
    .route('/')
    .get(TournamentController.getTournaments)
    .post(TournamentController.createTournament)

router
    .route('/:id')
    .get(TournamentController.getTournamentByCode)

router
    .route('/compete')
    .post(TournamentController.addTeamToTournament)

export default router;