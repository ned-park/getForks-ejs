const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboard') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', dashboardController.getRecipes)

router.post('/createRecipe', ensureAuth, dashboardController.createRecipe)

router.put('/modifyRecipe', ensureAuth, dashboardController.modifyRecipe)

router.delete('/deleteRecipe', ensureAuth, dashboardController.deleteRecipe)

router.get('/:recipeId', dashboardController.getRecipe)

module.exports = router