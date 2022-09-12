const Recipe = require('../models/Recipe')
const Repo = require('../models/Repo')
const User = require('../models/User')

module.exports = {
    getUser: async (req, res) => {
        try{
            let landedAtUser = req.baseUrl.slice(1,) || req.user
            let userToDisplay = await User.findOne({username: landedAtUser})

            // Make sure there is a user, and strip the password and email from the document
            if (!userToDisplay) return res.status(404).json({errors: [{msg: 'User does not exist'}]})
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
    getRecipe: async (req, res) => { // unused, might be handy
        let usernamePage = req.baseUrl.slice(1,)
        const recipe = await Recipe.findById(req.params.recipeId)
        console.log(recipe)
        res.render('recipe.ejs', {user: req.user, recipe: recipe, usernamePage: usernamePage})
    },
    getRepo: async (req, res) => { 
        let usernamePage = req.baseUrl.slice(1,)
        const repo = await Repo.findOne({_id: req.params.repoId}).populate('versions')
        res.render('repo.ejs', {user: req.user, repo: repo, usernamePage: usernamePage})
    },
    createRepoFromRecipe: async (req, res) => {
        try {
            const user = await User.findById(req.user.id)
            const newRecipe = new Recipe({
                title: req.body.title,
                notes: req.body.notes || '',
                instructions: [req.body.instructions], 
                ingredients: [req.body.ingredients], 
                userId: req.user.id
            })

            const newRepo = new Repo({
                title: req.body.title,
                description: req.body.description,
                userId: req.user.id,
                versions: [newRecipe._id],
                tags: req.body.tags.length > 0? req.body.tags.split(' ') : [],
            })
            newRecipe.repo = newRepo._id
            const savedRecipe = await newRecipe.save()
            const savedRepo = await newRepo.save()

            user.repos = user.repos.concat(savedRepo._id)
            await user.save()

            res.redirect(`/${req.user.username}`)
        } catch(err) {
            console.log(err)
        }
    },
    forkRepo: async (req, res) => {
        try {
            const originalRepo = await Repo.findOne({_id: req.body.repoId}).populate('versions', 'branches')
            const recipes = await Recipe.find({repo: req.body.repoId})
            console.log(originalRepo.versions)
            console.log(recipes.length)

            let versionsClone = recipes.map(recipe => 
                new Recipe({
                    title: recipe.title,
                    notes: recipe.notes,
                    ingredients: recipe.ingredients,
                    instructions: recipe.instructions,
                    userId: req.user.id,
                    clonedFrom: recipe.userId
                })
            )

            let newVersionsId = versionsClone.map(recipe => recipe._id)

            const newRepo = new Repo({
                title: originalRepo.title,
                description: originalRepo.description,
                latest: originalRepo.latest,
                userId: req.user.id,
                versions: newVersionsId,
                tags: [].concat(...originalRepo.tags),
                branches: [], //eventually deep copy if branching implemented
                forkedFrom: originalRepo._id,
                display: true,
            })

            console.log('new Repo in progress...')
            let promises = versionsClone.map(r => {
                console.log(r)
                r.repo = newRepo._id
                return r.save()
            })
            let fulfilled = await Promise.all(promises)
            const savedRepo = await newRepo.save()
            console.log('Repo was cloned!')

            res.redirect(`/${req.user.username}/${savedRepo._id}`)
        } catch(err) {
            console.log(err)
        }
    },
    addRecipe: async (req, res) => {
        try {
            const currentRepo = Repo.findOne({_id: req.body.repoId})
            const newRecipe = new Recipe({
                title: req.body.title,
                notes: req.body.notes,
                ingredients: [req.body.ingredients],
                instructions: [req.body.instructions],
                userid: req.user.id,
                repo: req.body.repoId
            })

            const savedRecipe = await newRecipe.save()

            await Repo.findOneAndUpdate({_id: req.body.recipeId}, {
                description: req.body.description,
                version: currentRepo.version + 1,
                versions: [...currentRepo.versions, savedRecipe._id]
            })
            console.log('Recipe updated')
            res.redirect(`/${req.user.username}/req.body.repoId`)
        } catch(err) {
            console.log(err)
        }
    },
    deleteRecipe: async (req, res) => {
        if (req.user.username != req.body.username) return res.status(404).json({errors: [{msg: 'You do not have permission to delete this repository'}]})
        try {
            await User.findOneAndUpdate({_id: req.user.id}, {
                $pull: {repos: req.body.repoId}
            })
            await Recipe.deleteMany({repo: req.body.repoId})
            await Repo.findOneAndDelete({_id:req.body.repoId})
            console.log('Deleted Repo')
            res.redirect(204, `/${req.user.username}`)
        } catch(err) {
            console.log(err)
        }
    }
}    