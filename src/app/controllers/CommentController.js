const Comment = require("../models/Comment.js");

class CommentController {
  postComment(req, res) {
    const comment = new Comment({
      slug: req.params.slug,
      content: req.body.content,
    });
    comment.save().then((comment) => {
      res.redirect("/blog/" + req.params.slug);
    });
  }
}

module.exports = new CommentController();
