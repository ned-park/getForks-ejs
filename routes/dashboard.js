const express = require('express')
const router = express.Router()
const dashboardController = require('../controllers/dashboard') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', ensureAuth, dashboardController.getRecipes)

router.post('/createRecipe', dashboardController.createRecipe)

router.put('/modifyRecipe', dashboardController.modifyRecipe)

router.delete('/deleteRecipe', dashboardController.deleteRecipe)

module.exports = router