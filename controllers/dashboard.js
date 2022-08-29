const Recipe = require('../models/Recipe')

module.exports = {
    getRecipes: async (req,res)=>{
        console.log(req.user)
        try{
            const recipes = await Recipe.find({userId:req.user.id})
            const itemsLeft = await Recipe.countDocuments({userId:req.user.id,completed: false})
            res.render('dashboard.ejs', {recipes: recipes, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createRecipe: async (req, res)=>{
        try{
            await Recipe.create({recipe: req.body.recipeItem, completed: false, userId: req.user.id})
            console.log('Recipe has been added!')
            res.redirect('/dashboard')
        }catch(err){
            console.log(err)
        }
    },
    modifyRecipe: async (req, res)=>{
        try{
            await Recipe.findOneAndUpdate({_id:req.body.recipeId},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    deleteRecipe: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Recipe.findOneAndDelete({_id:req.body.recipeId})
            console.log('Deleted Recipe')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    