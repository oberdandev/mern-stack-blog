import {User} from '../models/User.js'
import jwt from 'jsonwebtoken'

export const auth = 
{
    loginService: async (email) => await User.findOne({email: email}).select("+password"),  
    
    generateToken: (id) => jwt.sign({id: id}, process.env.SECRET_JWT, {expiresIn: 86400}),
}
    