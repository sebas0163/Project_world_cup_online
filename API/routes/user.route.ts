import express from 'express';
const router = express.Router();
import UserController from '../controllers/user.controller';

router
    .route('/')
    .get(UserController.getUsers)
    .post(UserController.createUser);

router
    .route('/:id')
    .get(UserController.getUserById);

router
    .route('/login')
    .post(UserController.login);

export default router;