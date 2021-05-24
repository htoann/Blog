const BlogPost = require("../models/BlogPost");
const { multipleMongooseToObject } = require("../../until/mongoose");
const { mongooseToObject } = require("../../until/mongoose");
const User = require("../models/User");

class MeController {
  // [GET] /me/stored/posts
  getStored(req, res, next) {
    Promise.all([BlogPost.find({}), BlogPost.countDocumentsDeleted()])
      .then(([posts, deletedCount]) => {
        if (req.isAuthenticated()) {
          BlogPost.find({ author: req.user.username })
            .then((posts) => {
              res.render("me/stored-post", {
                deletedCount,
                posts: multipleMongooseToObject(posts),
              });
            })
            .catch(next);
        } else res.redirect("back");
      })
      .catch(next);
  }

  // [GET] /me/stored/posts
  getTrash(req, res, next) {
    BlogPost.findDeleted({})
      .then((posts) =>
        res.render("me/trash-post", {
          posts: multipleMongooseToObject(posts),
        })
      )
      .catch(next);
  }
}

module.exports = new MeController();
