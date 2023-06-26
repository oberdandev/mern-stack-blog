import NewsService from '.././services/news.service.js'

const sendResponseNews = (req,res, news, mapping) => {
  if(mapping){
    return res.send({  
      result: news.map(item => (
        { 
          id: item._id,
          title: item.title,
          text: item.text,
          banner: item.banner,
          likes: item.likes,
          comments: item.comments,
          name: item.user.name,
          userName: item.user.username,
          userId: item.user._id,
          userAvatar: item.user.avatar,
        }))
    })
  }
  return res.send({
    id: news._id,
    title: news.title,
    text: news.text,
    banner: news.banner,
    likes: news.likes,
    comments: news.comments,
    name: news.user.name,
    userName: news.user.username,
    userId: news.user._id,
    userAvatar: news.user.avatar,
  })
}

const New = {
  async create(req,res) {
    try{
      const {title, subtitle, text, banner} = req.body

      if(!title || !subtitle || !text || !banner){
        return res.status(400).send({messsage: 'Please enter all fields for registration'})
      }     

      const createdNew = await NewsService.create({
        title, 
        subtitle, 
        text, 
        banner,
        user: req.userId,
    })
        res.status(201).send({message: 'Created', createdNew, userData: req.userData})
        }
        catch(err){
            return res.status(500).send(err.message)
        }
  },

  async findAll(req,res) {
      try{
        let {offset, limit} = req.query

        if(!offset) offset = 0
        if(!limit) limit = 5
  
        offset = Number(offset)
        limit = Number(limit)
        const total = await NewsService.countNews();
        const currentUrl = req.baseUrl;
  
        const next = offset + limit;
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;
        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;
  
        const news = await NewsService.findAll(offset, limit)
  
          if(news.length === 0){
              return res.status(400).send({
                  messsage: "There are no registered news available"
              })
          }
  
          res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            result: news.map(item => (
              { 
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                userName: item.user.username,
                userId: item.user._id,
                userAvatar: item.user.avatar,
              }))
          })
      }catch(err){
        return res.status(500).send(err.message)
      }
      
  },

  topNews: async(req,res) => {
     try{
      const news = await NewsService.topNewsService();
      if(!news) return res.sendStatus(400).send({message: "There is no registered post"})

      return sendResponseNews(req,res,news);
      
      }catch(err){
        return res.status(500).send(err.message)
      }
  },

  async findById(req,res){
      try{
        const newsID = req.params.id;
        const news = await NewsService.findOneById(newsID);
        if(!news) return res.send({message: "There's is no post with this id: " + newsID})
  
      return sendResponseNews(req,res,news)
      }catch(err){
        return res.status(400).send(err.message)
      }
  },

  async searchByTitleOrText(req, res){
    try{
      const {q} = req.query

      const news = await NewsService.searchByTitleOrText(q);
      if(!news.length === 0) return res.status(400).send({message: "There are no news with this title or content text"});

      const mapping = true;
      return sendResponseNews(req,res,news, mapping)
      
    }catch(err){
      res.status(500).send({message: err.message});
      }
    },

  async searchByUser(req,res){
    try{
      const {id} = req.params
      console.log(id)
      if(!id) return res.status(400).send({message: "This id is invalid"});
   
      const news = await NewsService.searchByUser(id)
      const mapping = true;
      return sendResponseNews(req,res, news, mapping)
    }catch(err){
      return res.status(400).send(err.message)
    }
  },

  async update(req,res){
    try{
      const {title, text, banner} = req.body;
      const {id} = req.params;

      if(!title && !text && !banner){
        return res.status(400).send({message: "Submit at least one field to update the post"});
      }
      
      const news = await NewsService.findOneById(id)
      console.log('news id', typeof(news.user.id), 'req id', typeof(id))

      if(news.user.id !== req.userId){
        return res.sendStatus(400).send({message: "You must be the owner of post to update"})
      }

      await NewsService.update(id, title, text, banner);
      res.send({message: "Updated successfully"});

    }catch(err){
      return res.status(400).send(err.message)
    }
  },

  async delete(req,res){
    try{
      const {id} = req.params;

      const news = await NewsService.findOneById(id);
      
      if(!news) return res.send({message: "No news found"})
      if(news.user.id != req.userId) return res.send({message: "You do not have permission to delete this post"})
      
      await NewsService.delete(id)
      return res.send({message: "Post successfully deleted"})
    }catch(err){
      return res.status(400).send(err.message)
    }
  }

}

export default New