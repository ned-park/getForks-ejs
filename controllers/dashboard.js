const Recipe = require('../models/Recipe')
const User = require('../models/User')

module.exports = {
    getRecipes: async (req, res) => {
        try{
            let usernamePage = req.baseUrl.slice(1,)
            let userForDisplay = await User.findOne({username: usernamePage})
            userForDisplay = {
                username: userForDisplay.username, 
                _id: userForDisplay._id
            }
            console.log(userForDisplay)
            if (/*req.user*/ userForDisplay) {
                const recipes = await Recipe.find({userId: userForDisplay._id})
                res.render('dashboard.ejs', {recipes: recipes, user: req.user, usernamePage: userForDisplay.username})
            } else {
                res.render('dashboard.ejs', {user: null, usernamePage: usernamePage})
            }
        } catch(err) {
            console.log(err)
        }
    },
    getRecipe: async (req, res) => {
        let usernamePage = req.baseUrl.slice(1,)
        // console.log(req.params.recipeId)
        const recipe = await Recipe.findById(req.params.recipeId)
        // console.log(recipe)
        res.render('recipe.ejs', {user: req.user, recipe: recipe, usernamePage: usernamePage})
    },
    createRecipe: async (req, res) => {
        try {
            await Recipe.create({
                title: req.body.title,
                description: req.body.description || '',
                instructions: req.body.instructions, 
                ingredients:req.body.ingredients, 
                userId: req.user.id
            })
            console.log('Recipe has been added!')
            res.redirect(`/${req.user.username}`)
        } catch(err) {
            console.log(err)
        }
    },
    modifyRecipe: async (req, res) => {
        try {
            await Recipe.findOneAndUpdate({_id:req.body.recipeId}, {
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        } catch(err) {
            console.log(err)
        }
    },
    deleteRecipe: async (req, res) => {
        try {
            await Recipe.findOneAndDelete({_id:req.body.recipeId})
            console.log('Deleted Recipe')
            res.json('Deleted It')
        } catch(err) {
            console.log(err)
        }
    }
}    