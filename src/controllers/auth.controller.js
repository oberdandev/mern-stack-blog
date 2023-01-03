import bcrypt from 'bcrypt';
import { auth } from '.././services/auth.service.js';

const login = async (req,res) => {
        try{
            const {email, password} = req.body;

            const user = await auth.loginService(email);
            if(!user){
                return res.status(400).send({message: 'Invalid username and password'})
            }

            const passwordIsValid = await bcrypt.compare(password, user.password)
            if(!passwordIsValid) 
            {
                return res.status(403).send({message: 'Invalid username and password'})
            };

            const token = auth.generateToken(user.id)
    

            res.status(200).send({
                message: 'Login successfull',
                user,
                token: token
            })

        }
        catch(err){
            res.status(500).send({message: err.message})
        }
       

}

export {login}