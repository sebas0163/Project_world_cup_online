import express from 'express';
const router = express.Router();
import TeamController from '../controllers/team.controller';

router
    .route('/')
    .get(TeamController.getTeams)
    .post(TeamController.createTeam)

router
    .route('/:id')
    .get(TeamController.getTeamsByTournamentCode)

router
    .route('/single/:id')
    .get(TeamController.getTeamById)

router
    .route('/type/:type')
    .get(TeamController.getTeamsByType)

export default router;