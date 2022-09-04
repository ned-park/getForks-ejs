const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: '',
  },
  ingredients: {
    type: [Object],
    required: true,
  },
  instructions: {
    type: [String],
    required: true
  }, 
  userId: {
    type: String,
    required: true
  },
  forkedFrom: {
    type: String,
    required: false
  },
  branches: {
    type: Object,
    required: false
  }  
})

module.exports = mongoose.model('Recipe', RecipeSchema)
