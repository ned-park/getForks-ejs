const mongoose = require('mongoose')
const Recipe = require('../models/Recipe')

const RepoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  latest: {
    type: Number,
    required: true,
    default: 0
  },
  description: {
    type: String,
    required: false,
    default: '',
  },
  cloudinaryId: {
    type: String,
    require: false,
  },
  image: {
    type: String,
    require: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  versions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Recipe',
    required: true
  },
  tags: {
    type: [String],
    required: false,
    index: true
  },
  branches: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
      }
    ],
    required: false,
  },
  forkedFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Repo',
    required: false
  },  
  display: {
    type: Boolean,
    default: true,
    required: true
  }
})

module.exports = mongoose.model('Repo', RepoSchema)