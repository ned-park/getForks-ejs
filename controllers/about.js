const User = require('../models/User')

module.exports = {
  getIndex: async (req,res) => {
    if (req.user) {
      // const user = await User.find({_id: req.user.id})
      res.render('about.ejs', {user: req.user}) 
    } else {
      res.render('about.ejs', {user: null})
    }
  }
}