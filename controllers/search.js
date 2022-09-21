const User = require('../models/User')
const Repo = require('../models/Repo')

module.exports = {
    getQuery: async (req,res) => {
      try {
        console.log(req.query.query)
        const repos = await Repo.find({}).populate('userId')
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