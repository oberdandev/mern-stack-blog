import mongoose from 'mongoose';
mongoose.set('strictQuery', false)


const database = {
  async connect() {
    const urlMongo = process.env.URI_MONGODB
    
    console.log('wait connect to database: mongodb')
    await mongoose.connect(urlMongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "blog",
        })
        .catch(err => console.log(err))
    },

}

// Listeners for changes
mongoose.connection.on('connected', ()=> console.log('mongodb connected'))

export {database}