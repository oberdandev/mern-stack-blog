import {User} from '../models/User.js'

export const loginService = async (email) => await User.findOne({email: email}).select("+password")