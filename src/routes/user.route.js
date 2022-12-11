import express from 'express';
import userController from '../controllers/user.controller.js';
import path from 'path';

const UserRoute = express.Router();

UserRoute.get('/', userController.findAll)
UserRoute.post('/', userController.create)
UserRoute.get('/:id', userController.findOneById)
UserRoute.patch('/:id', userController.update)

export default UserRoute