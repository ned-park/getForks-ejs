const Comment = require("../models/Comment");

module.exports = {
    createComment: async (req, res) => {
        try {
            await Comment.create({
                ccontent: req.body.comment,
                repoId: req.params.id,
                user: req.user.id,
            });
            console.log("Comment has been added!");
            res.redirect(`/post/${req.params.id}`);
        } catch (err) {
            console.log(err); 
        }
    },
    deleteComment: async (req, res) => {
        try {
            // Find post by id
            let comment = await Comment.findById({ _id: req.params.id });
            console.log({ comment })
            if (req.user.id == comment.userId) {
              await Comment.deleteOne({ _id: req.params.id });
              console.log("Deleted Comment");
            }
            res.redirect(`/${req.body.usernamePage}/${req.params.id}`);
        } catch (err) {
          res.redirect(`/${req.body.usernamePage}/${req.params.id}`);
        }
    }
}