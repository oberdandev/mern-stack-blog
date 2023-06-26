import News from '.././models/News.js'

const NewsService =  {
  create: async (body) => News.create(body),
  findAll: async (offset, limit) => News.find().sort({_id: -1}).limit(limit).skip(offset).populate('user'),
  countNews: async() => News.countDocuments(),
  topNewsService: async()=> News.findOne().sort({_id: -1}).populate('user'),
  findOneById: async(id) => News.findById(id).populate('user'),
  searchByTitleOrText: async(text) => {    
      
      const searchByTitle = await News.find({title: {$regex: `${text || ""}`, $options: "i"},
      }).sort({_id: -1}).populate('user')  
      
      if(searchByTitle.length === 0) {
        return News.find({text: {$regex: `${text || ""}`, $options: "i"}})
        .sort({_id: -1})
        .populate('user')
      }

      return searchByTitle;
    },
  searchByUser: async(id) => News.find({user: id}).sort({_id: -1}).populate('user'),
  update: async(id, title, text, banner) => 
    News.findOneAndUpdate({_id: id}, 
    {title, text, banner},
    {rawResult: true}),
  delete: async(id) => News.findOneAndDelete({_id: id})
  
} 

export default NewsService