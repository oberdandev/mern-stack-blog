import NewsService from '.././services/news.service.js'

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
      let {offset, limit} = req.query

      if(!offset) offset = 0
      if(!limit) limit = 5

      const news = await NewsService.findAll(offset, limit)

        if(news.length === 0){
            return res.status(400).send({
                messsage: "There are no registered news available"
            })
        }

        res.send(news)
    },


}

export default New