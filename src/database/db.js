import mongoose from 'mongoose';
mongoose.set('strictQuery', false)
import dotenv from 'dotenv'
dotenv.config()

const uri = process.env.URI_MONGODB

const database = {
  async connect() {
    console.log('wait connect to database: mongodb')
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "blog",
        })
        .catch(err => console.log(err))
    },

}

mongoose.connection.on('connected', ()=> console.log('mongodb connected'))

export {database}