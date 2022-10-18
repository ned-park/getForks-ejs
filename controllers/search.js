const User = require('../models/User')
const Repo = require('../models/Repo')

module.exports = {
    getQuery: async (req,res) => {
      try {
        const { page, limit} = { page: +req.query.page || 1, limit: +req.query.limit || 5};
        console.log(page, limit)
        const repos = await Repo.find({$or: [{
            title: {$regex: req.query.query, $options: 'i'}}, 
            {tags: {$regex: req.query.query, $options: 'i'}}
          ]
        }).limit(limit * 1).skip((page - 1) * limit).sort({creationDate: -1}).populate('userId').lean()
        if (req.user) {
            const user = await User.find({_id: req.user.id})
            res.render('index.ejs', {user: req.user, repos: repos, page: page, limit: limit}) 
          } else {
            res.render('index.ejs', {user: null, repos: repos, page: page, limit: limit})
          }
        } catch(err) {
          console.log(err)
        }
    }
}