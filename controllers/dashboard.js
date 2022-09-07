const Recipe = require('../models/Recipe')
const Repo = require('../models/Repo')
const User = require('../models/User')

module.exports = {
    getUser: async (req, res) => {
        try{
            let landedAtUser = req.baseUrl.slice(1,) || req.user
            let userToDisplay = await User.findOne({username: landedAtUser})

            // Make sure there is a user, and strip the password and email from the document
            if (!userToDisplay) userToDisplay = req.user
            userToDisplay = {
                username: userToDisplay.username, 
                _id: userToDisplay._id || userToDisplay.id
            }

            if (userToDisplay) {
                const repos = await Repo.find({userId: userToDisplay._id})
                res.render('dashboard.ejs', {repos: repos, user: req.user, usernamePage: userToDisplay.username})
            } else {
                res.render('dashboard.ejs', {user: null, usernamePage: landedAtUser})
            }
        } catch(err) {
            console.log(err)
        }
    },
    getRecipe: async (req, res) => { // change this to get Repo, then make client-side fetch for versions vs render server side on latest or client version?
        let usernamePage = req.baseUrl.slice(1,)
        // console.log(req.params.recipeId)
        const recipe = await Recipe.findById(req.params.recipeId)
        console.log(recipe)
        res.render('recipe.ejs', {user: req.user, recipe: recipe, usernamePage: usernamePage})
    },
    getRepo: async (req, res) => { 
        let usernamePage = req.baseUrl.slice(1,)
        // console.log(req.params.repoId)
        const repo = await Repo.findOne({_id: req.params.repoId}).populate('versions')
        res.render('repo.ejs', {user: req.user, repo: repo, usernamePage: usernamePage})
    },
    createRepoFromRecipe: async (req, res) => {
        try {
            const user = await User.findById(req.user.id)
            console.log('user found')
            const newRecipe = new Recipe({
                title: req.body.title,
                notes: req.body.notes || '',
                instructions: [req.body.instructions], 
                ingredients: [req.body.ingredients], 
                userId: req.user.id
            })

            const savedRecipe = await newRecipe.save()
            console.log('recipe saved')
            const newRepo = new Repo({
                title: req.body.title,
                description: req.body.description,
                userId: req.user.id,
                versions: [savedRecipe._id],
                tags: req.body.tags.length > 0? req.body.tags.split(' ') : [],
                // branches: [],
                // forkedFrom: RepoId
            })
            const savedRepo = await newRepo.save()
            console.log('repo saved')

            user.repos = user.repos.concat(savedRepo._id)
            await user.save()

            console.log('Recipe has been added!')
            res.redirect(`/${req.user.username}`)
        } catch(err) {
            console.log(err)
        }
    },
    forkRecipe: async (req, res) => {
        // get original repo? and copy everything vs copy current..
        // get the current recipe, update the userId and add a forked from pointing to the original repo
        // 

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
            let currentRecipe = Recipe.findOne({_id: req.body.recipeId})
            let newRecipe = {

            }
            await Recipe.findOneAndUpdate({_id: req.body.recipeId}, {
                description: req.body.description
            })
            console.log('Recipe updated')
            res.json('Recipe updated')
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