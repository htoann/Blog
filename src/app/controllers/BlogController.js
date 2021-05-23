const BlogPost = require("../models/BlogPost");
const { multipleMongooseToObject } = require("../../until/mongoose");
const { mongooseToObject } = require("../../until/mongoose");
const User = require("../models/User.js");
const Comment = require("../models/Comment.js");

class BlogController {
  index(req, res, next) {
    BlogPost.find({})
      .then((posts) => {
        res.render("blog", {
          posts: multipleMongooseToObject(posts),
        });
      })
      .catch(next);
  }

  // [GET] /blog/:slug
  getDetail(req, res, next) {
    BlogPost.findOne({ slug: req.params.slug })
      .then((post) => {
        res.render("blog/detail", { post: mongooseToObject(post) });
        return Comment.find({ slug: req.params.slug });
      })
      .catch(next);
  }

  // [GET] /blog /create
  getCreate(req, res, next) {
    if (req.isAuthenticated())
      res.render("blog/create", { author: req.user.username });
    else res.redirect("/auth/login");
  }

  // [POST] /blog /store
  postCreate(req, res, next) {
    const blog = new BlogPost(req.body);
    blog
      .save()
      .then(() => res.redirect("/me/stored/posts"))
      .catch((err) => {});
  }

  // [GET] /blog/:id/edit
  getEdit(req, res, next) {
    if (req.isAuthenticated()) {
      BlogPost.findById(req.params.id)
        .then((post) => {
          if (post.author == req.user.username) {
            return res.render("blog/edit", {
              post: mongooseToObject(post),
            });
          } else {
            res.redirect("back");
          }
        })
        .catch(next);
    } else res.redirect("back");
  }

  // [PUT] /blog/:id/
  putUpdate(req, res, next) {
    BlogPost.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/posts"))
      .catch(next);
  }

  // {deleteOne} to delete forever

  // [DELETE] /blog/:id/ Soft Delete
  deleteDelete(req, res, next) {
    if (req.isAuthenticated()) {
      BlogPost.findById(req.params.id)
        .then((post) => {
          if (post.author == req.user.username) {
            post.delete();
            res.redirect("back");
          } else {
            res.redirect("back");
          }
        })
        .catch(next);
    } else res.redirect("back");
  }

  // [PATCH] /blog/:id/restore
  patchRestore(req, res, next) {
    BlogPost.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

module.exports = new BlogController();
