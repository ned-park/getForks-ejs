const Recipe = require('../models/Recipe')
const User = require('../models/User')

module.exports = {
    getRecipes: async (req, res) => {
        try{
            let usernamePage = req.baseUrl.slice(1,)
            console.log(`req.baseUrl: ${req.baseURL}`)
            let userForDisplay = await User.findOne({username: usernamePage})
            if (!userForDisplay) userForDisplay = req.user
            userForDisplay = {
                username: userForDisplay.username, 
                _id: userForDisplay._id
            }
            // console.log(userForDisplay)
            if (userForDisplay) {
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
    forkRecipe: async (req, res) => {
        let recipe = await Recipe.findOne({_id: req.body.recipeId})
        delete recipe._id
        console.log(console.log(req.user))
        try {
            let newRecipe = await Recipe.create({
                title: recipe.title,
                description: recipe.description,
                instructions: recipe.instructions,
                ingredients: recipe.ingredients,
                userId: req.user.id,
                forkedFrom: {user: recipe.userId, recipe: req.body.recipeId},
            })
            console.log('Recipe has been added!')

            res.redirect(`/${req.user.username}/${newRecipe._id}`)
            // res.redirect('/')
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
        console.log('DELETING')
        console.log(req.body.username)
        try {
            await Recipe.findOneAndDelete({_id:req.body.recipeId})
            console.log('Deleted Recipe')
            res.redirect(204, `/${req.body.username}`)
        } catch(err) {
            console.log(err)
        }
    }
}    