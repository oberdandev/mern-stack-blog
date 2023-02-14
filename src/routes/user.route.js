import express from 'express';
import userController from '../controllers/user.controller.js';
import {validUser, validID} from '../middlewares/global.middlewares.js'

const UserRoute = express.Router();

UserRoute.get('/', userController.findAll)
UserRoute.post('/', userController.create)
UserRoute.get('/:id', validID, validUser, userController.findOneById)
UserRoute.patch('/:id', validID, validUser, userController.update)

export default UserRoute