const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
  description: {
    type: String,
    required: false,
    default: ''
  },
  ingredients: {
    type: [String],
    required: true
  },
  instructions: {
    type: [String],
    required: true
  }, 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  forkedFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },

})

module.exports = mongoose.model('Recipe', RecipeSchema)
