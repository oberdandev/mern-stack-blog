import express from 'express';
import UserRoute from './src/routes/user.route.js'
import {database} from './src/database/db.js'

const app = express();

const port = 3333

database.connect()

app.listen(port, () => console.log('listening on port ' + port))

app.use(express.json())
app.use('/user', UserRoute)


