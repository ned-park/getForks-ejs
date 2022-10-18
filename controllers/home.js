const User = require('../models/User')
const Repo = require('../models/Repo')

module.exports = {
    getIndex: async (req,res) => {
      console.log(req.query)
      const { page, limit} = { page: +req.query.page || 1, limit: +req.query.limit || 5};
      console.log(page, limit)
      try {
        const repos = await (await Repo.find({ forkedFrom: { $exists: false } } ).limit(limit * 1).skip((page - 1) * limit).sort({creationDate: -1}).populate('userId')).filter(repo => !repo.forkedFrom)
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