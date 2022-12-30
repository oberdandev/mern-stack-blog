import { User } from "../models/User.js"
import UserService from '../services/user.service.js'

const userController = {
  
  async create(req,res) {
      try{
      const body = req.body
      const {name, username, email, password, avatar, background} = req.body
  
      if(!name || !username || !email || !password || !avatar || !background) {
        return res.status(400).send({error: "Submit all fields for registration"})
      }
  
      const userCreated = await UserService.create(body)
  
          res.status(201).send({
          message: "created user",
          user: {
              id: userCreated._id,
              name,
              username,
              email,
              avatar,
              background}})
          } catch(err) {
            res.status(400).send({
              messsage: 'Error at create user', error: err.message, stack: err.stack
            })
          }
      },

  async findAll(req,res) {
    try{
        const docs = UserService.findAll()
      .then((docs) => 
      { 
        docs.map(doc => {console.log(doc)}) 
        res.status(200).send(docs)
      })
      .catch(err => 
       {
        console.log('Error trying to find all users from mongodb /n' + err)
        res.status(500).send({message: "Error trying to find all users from mongodb", err})
      })
    } 
    catch(err) {
      res.status(500).send(
        {
          message: err.message
        })
      }
  },

  async findOneById(req,res) {
    const user = req.user
    res.send(user)
  },

  async update(req, res) {
    const {name, username, email, password, avatar, background} = req.body
    if(!name && !username && !email && !password && !avatar && !background) {
      return res.status(400).send({message: "Submit at least one field for update"})
    }

    const user = req.user

    await UserService.update(user._id, {
      name,
      username,
      email,
      password,
      avatar,
      background
    })

    res.send({
      message: "User successufly updated", 
      updated: {name,username,email,avatar,background}
    })

  },

}



export default userController