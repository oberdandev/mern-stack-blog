import mongoose from 'mongoose';
import UserService from '../services/user.service.js'

const validID = async (req, res, next) => {
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({message: 'Invalid ID'})
    }
    
    req.id = id;
    next()
}

const validUser = async (req, res, next) => {
    
    const id = req.params.id
    const user = await UserService.findOneById(id)
    
    if(!user) {
      return res.status(400).send({message: 'User does not exist'})
    }

    req.user = user;
    req.id = id;
    next()
}


export {validUser, validID}