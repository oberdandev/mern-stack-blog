import News from '.././models/News.js'

const NewsService =  {
    create: async (body) => News.create(body),

    findAll: async (offset, limit) => News.find().sort({_id: -1}).limit(limit).skip(offset).populate('user'),
    countNews: async() => News.countDocuments(),
    topNewsService: async()=> News.findOne().sort({_id: -1}).populate('user'),
    findOneById: async(id) => News.findById(id).populate('user'),
    searchByTitleOrText: async(title) => 
    {   return (
        News.find({title: {$regex: `${title} || ""}`, $options: "i"}})
        .sort({_id: -1})
        .populate('user')  
        || 
        News.find({text: {$regex: `${title} || ""}`, $options: "i"}})
        .sort({_id: -1})
        .populate('user'))
    }   
} 

export default NewsService