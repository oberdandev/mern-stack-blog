import bcrypt from 'bcrypt';
import { loginService } from '.././services/auth.service.js';

const login = async (req,res) => {

        try{
            const {email, password} = req.body;

            const user = await loginService(email);
            const passwordIsValid = await bcrypt.compare(password, user.password)
            console.log(passwordIsValid);

            res.status(200).send({
                message: 'Login successful',
                user
            })

        }
        catch(err){
            res.status(500).send({error: err.message})
        }
       

    //const passwordIsValid = bcrypt.verify

    
}

export {login}