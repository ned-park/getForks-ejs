const Recipe = require('../models/Recipe')

module.exports = {
    getRecipes: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await Recipe.find({userId:req.user.id})
            const itemsLeft = await Recipe.countDocuments({userId:req.user.id,completed: false})
            res.render('dashboard.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createRecipe: async (req, res)=>{
        try{
            await Recipe.create({todo: req.body.todoItem, completed: false, userId: req.user.id})
            console.log('Recipe has been added!')
            res.redirect('/dashboard')
        }catch(err){
            console.log(err)
        }
    },
    modifyRecipe: async (req, res)=>{
        try{
            await Recipe.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
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
            await Recipe.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Recipe')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    