const Comment = require("../models/Comment");

module.exports = {
    createComment: async (req, res) => {
        try {
            await Comment.create({
                content: req.body.content,
                repoId: req.body.repoId,
                userId: req.user.id,
            });
            console.log("Comment has been added!");
            res.redirect(`/${req.body.usernamePage}/${req.params.id}`);
        } catch (err) {
            console.log(err); 
        }
    },
    deleteComment: async (req, res) => {
        try {
            // Find post by id
            let comment = await Comment.findById({ _id: req.params.id });
            console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<', req.body)
            if (req.user.id == comment.userId) {
              await Comment.deleteOne({ _id: req.params.id });
              console.log("Deleted Comment");
            }
            res.redirect(`/${req.body.usernamePage}/${req.body.repoId}`);
        } catch (err) {
          res.redirect(`/${req.body.usernamePage}/${req.body.repoId}`);
        }
    }
}