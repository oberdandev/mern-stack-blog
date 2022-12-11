import mongoose from 'mongoose';
import { User } from "../models/User.js"
import UserService from '../services/user.service.js'

const userController = {
  async create(req,res) {
    const body = req.body
    const {name, username, email, password, avatar, background} = req.body

    if(!name || !username || !email || !password || !avatar || !background) {
      return res.status(400)
      .send({error: "Submit all fields for registration"})
    }

    const user = await UserService.create(body)
    .catch(err => console.log('ERRO AO TENTAR CRIAR UM USUÁRIO NO BANCO DE DADOS: MONGODB \n', err))

    if(!user) return res.status(400).send({message: "Error at create user"})

    return res.status(201).send({
        message: "created user",
        user: {
            id: user._id,
            name,
            username,
            email,
            avatar,
            background
        }})
    },

  async findAll(req,res) {
    const docs = UserService.findAll()
  .then((docs) => { docs.map(doc => { 
    console.log(doc) 
    }) 
    res.status(201).send(docs)
    })
  .catch(err => {
    console.log('Error trying to find all users from mongodb /n' + err)
    res.status(500).send({message: "Error trying to find all users from mongodb", err})
    })
  },

  async findOneById(req,res) {
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({message: 'Invalid ID'})
    }

    const user = await UserService.findOneById(id)
    .catch(err => res.status(500).send({message: "Error trying to find one user by id", err}))

    if(!user) return res.status(404).send({message: "User doesn't exist"})

    res.send(user)
  },

  async update(req, res) {
    
    const {name, username, email, password, avatar, background} = req.body
    if(!name && !username && !email && !password && !avatar && !background) {
      return res.status(400).send({message: "Submit at least one field for update"})
    }

    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({message: 'Invalid ID'})
    }

    const user = await UserService.findOneById(id)

    if(!user) {
      return res.status(400).send({message: 'User does not exist'})
    }

    await UserService.update(user._id, {
      name,
      username,
      email,
      password,
      avatar,
      background
    })

    res.send({message: "User successufly updated", 
    updated: {name,username,email,avatar,background
    }})

  }

}



export default userController