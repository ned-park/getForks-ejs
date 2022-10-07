const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment') 
const { ensureAuth } = require('../middleware/auth')

router.post('/createComment/:id', ensureAuth, commentController.createComment)

router.delete('/deleteRecipe/:id', ensureAuth, commentController.deleteComment)

module.exports = router