import jwt from 'jsonwebtoken' 
import UserService from '.././services/user.service.js'

export const authMiddleware = async(req, res, next) => {
  try{
    const {authorization} = req.headers
    if(!authorization) return res.send(401)
    
    const parts = authorization.split(" ")
    if(parts.length !== 2) return res.send(401)
    
    const [schema, token] = parts    
    if(schema !== 'Bearer') res.sendStatus(401).send('Use a Bearer token to access')
    
    jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
      if(err) res.status(401).send('Invalid token')
      
      const tokenId = decoded.id
      const user = await UserService.findOneById(tokenId)
      if(!user) res.status(403).send('Token valid but user not found')

      req.userId = user.id
      req.userData = user
      
     return next();
    })
    }catch(err){
        return res.status(500).send({message: err})
    }
}


