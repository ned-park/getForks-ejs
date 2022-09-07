const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboard') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', dashboardController.getUser)

router.post('/createRecipe', ensureAuth, dashboardController.createRepoFromRecipe)

router.post('/forkRecipe', ensureAuth, dashboardController.forkRecipe)

router.put('/modifyRecipe', ensureAuth, dashboardController.modifyRecipe)

router.delete('/deleteRecipe', ensureAuth, dashboardController.deleteRecipe)

router.get('/:recipeId', dashboardController.getRecipe)

module.exports = router