const BlogPost = require("../models/BlogPost");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");
const User = require("../models/User");

class MeController {
  // [GET] /me/stored/posts
  getStored(req, res, next) {
    if (req.isAuthenticated()) {
      // Admin
      if (req.user.email == "admin@admin.com") {
        Promise.all([BlogPost.find({}), BlogPost.countDocumentsDeleted()])
          .then(([posts, deletedCount]) => {
            BlogPost.find()
              .sort({ updatedAt: -1 })
              .then((posts) => {
                res.render("me/stored-blogs", {
                  deletedCount,
                  posts: multipleMongooseToObject(posts),
                });
              })
              .catch(next);
          })
          .catch(next);
        // User
      } else {
        Promise.all([
          BlogPost.find({}),
          BlogPost.countDocumentsDeleted({ author: req.user.username }),
        ])
          .then(([posts, deletedCount]) => {
            BlogPost.find({ author: req.user.username })
              .sort({ updatedAt: -1 })
              .then((posts) => {
                res.render("me/stored-blogs", {
                  deletedCount,
                  posts: multipleMongooseToObject(posts),
                });
              })
              .catch(next);
          })
          .catch(next);
      }
    } else res.redirect("/auth/login");
  }

  // [GET] /me/stored/posts
  getTrash(req, res, next) {
    // Admin
    if (req.user.email == "admin@admin.com") {
      BlogPost.findDeleted()
        .then((posts) =>
          res.render("me/trash-blogs", {
            posts: multipleMongooseToObject(posts),
          })
        )
        .catch(next);
      // User
    } else {
      BlogPost.findDeleted({ author: req.user.username })
        .then((posts) =>
          res.render("me/trash-blogs", {
            posts: multipleMongooseToObject(posts),
          })
        )
        .catch(next);
    }
  }
}

module.exports = new MeController();
