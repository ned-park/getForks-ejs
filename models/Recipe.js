const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
  notes: {
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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
})

module.exports = mongoose.model('Recipe', RecipeSchema)
