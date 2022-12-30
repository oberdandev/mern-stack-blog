import { User } from '../models/User.js'

const UserService = {
    create: async (body) => User.create(body),
    findAll: async (req,res) => User.find(),
    findOneById: async(id) => User.findById(id),
    update: async(id, body) => User.findOneAndUpdate(id, body),
} 

export default UserService

