const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
  recipe: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Recipe', RecipeSchema)
