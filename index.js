import express from 'express';
import {database} from './src/database/db.js'
import dotenv from 'dotenv'


import UserRoute from './src/routes/user.route.js'
import AuthRoute from './src/routes/auth.route.js'

dotenv.config()

const app = express();


const port = process.env.PORT || 3333

database.connect()

app.listen(port, () => console.log('listening on port ' + port))

app.use(express.json())
app.use('/user', UserRoute)
app.use('/auth', AuthRoute)


