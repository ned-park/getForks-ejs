const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: false,
    default: ''
  },
  ingredients: {
    type: [String],
    required: true,
    index: true
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
  clonedFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  repo: {
    type: mongoose.Schema.Types.ObjectId,
    red: 'Repo',
    required: false
  }
})

module.exports = mongoose.model('Recipe', RecipeSchema)
