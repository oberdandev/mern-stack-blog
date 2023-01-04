import News from '.././models/News.js'

const NewsService =  {
    create: async (body) => News.create(body),
    findAll: async (offset, limit) => News.find().sort({_id: -1}).limit(limit).skip(offset).populate('user'),
} 

export default NewsService