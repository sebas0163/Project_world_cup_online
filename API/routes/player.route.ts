import express from 'express';
import PlayerController from '../controllers/player.controller';
const router = express.Router();

router
    .route('/')
    .get(PlayerController.getPlayers)

router
    .route('/team/:id')
    .get(PlayerController.getPlayersByTeam)

export default router;