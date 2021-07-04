const BlogPost = require("../models/BlogPost");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");
const User = require("../models/User");

class MeController {
  // [GET] /me/stored/posts
  getStored(req, res, next) {
    Promise.all([
      BlogPost.find({}),
      BlogPost.countDocumentsDeleted({ author: req.user.username }),
    ])
      .then(([posts, deletedCount]) => {
        if (req.isAuthenticated()) {
          BlogPost.find({ author: req.user.username })
            .then((posts) => {
              res.render("me/stored-blogs", {
                deletedCount,
                posts: multipleMongooseToObject(posts),
              });
            })
            .catch(next);
        } else res.redirect("/auth/login");
      })
      .catch(next);
  }

  // [GET] /me/stored/posts
  getTrash(req, res, next) {
    BlogPost.findDeleted({ author: req.user.username })
      .then((posts) =>
        res.render("me/trash-blogs", {
          posts: multipleMongooseToObject(posts),
        })
      )
      .catch(next);
  }
}

module.exports = new MeController();
