const express = require('express')
const router = express.Router()
const upload = require("../middleware/multer")
const dashboardController = require('../controllers/dashboard') 
const commentController = require('../controllers/comment') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', dashboardController.getUser)

router.post('/createRecipe', ensureAuth, upload.single("file"), dashboardController.createRepoFromRecipe)

router.post('/forkRepo', ensureAuth, dashboardController.forkRepo)

router.post('/commitRecipe', ensureAuth, dashboardController.commitRecipe)

router.delete('/deleteRecipe', ensureAuth, dashboardController.deleteRecipe)

router.get('/:repoId', dashboardController.getRepo)

router.put('/editRepoImage', ensureAuth, upload.single("file"), dashboardController.editRepoImage)

module.exports = router