const User = require('../models/User')
const Repo = require('../models/Repo')

module.exports = {
    getQuery: async (req,res) => {
      try {
        const repos = await Repo.find({title: {$regex: req.query.query}}).populate('userId').lean()
        if (req.user) {
            const user = await User.find({_id: req.user.id})
            res.render('index.ejs', {user: req.user, repos: repos}) 
          } else {
            res.render('index.ejs', {user: null, repos: repos})
          }
        } catch(err) {
          console.log(err)
        }
    }
}