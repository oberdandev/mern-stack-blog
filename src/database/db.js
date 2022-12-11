import mongoose from 'mongoose';
mongoose.set('strictQuery', false)
const uri = 'mongodb+srv://admin:ShZIWQSM64kHuv56@blog.xm5mbuk.mongodb.net/?retryWrites=true&w=majority'

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