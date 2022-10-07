const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  content: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  repoId: {
    type: mongoose.Schema.Types.ObjectId,
    red: 'Repo',
    required: true
  }
})

module.exports = mongoose.model('Comment', CommentSchema)