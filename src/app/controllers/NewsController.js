const BlogPost = require("../models/BlogPost");
const { multipleMongooseToObject } = require("../../until/mongoose");
const { mongooseToObject } = require("../../until/mongoose");

class NewsController {
  // [GET] /news
  index(req, res, next) {
    BlogPost.find({})
      .then((posts) => {
        res.render("news", {
          posts: multipleMongooseToObject(posts),
        });
      })
      .catch(next);
  }

  // [GET] /news/:slug
  detail(req, res, next) {
    BlogPost.findOne({ slug: req.params.slug })
      .then((post) => {
        res.render("news/show", { post: mongooseToObject(post) });
      })
      .catch(next);
  }

  // [GET] /news /create
  create(req, res, next) {
    res.render("news/create");
  }

  // [POST] /news /store
  store(req, res, next) {
    const blog = new BlogPost(req.body);

    blog
      .save()
      .then(() => res.redirect("/me/stored/posts"))
      .catch((err) => {});
  }

  // [GET] /news/:id/edit
  edit(req, res, next) {
    BlogPost.findById(req.params.id)
      .then((post) =>
        res.render("news/edit", {
          post: mongooseToObject(post),
        })
      )
      .catch(next);
  }

  // [PUT] /news/:id/
  update(req, res, next) {
    BlogPost.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/posts"))
      .catch(next);
  }

  // // [DELETE] /news/:id/ Delete
  // delete(req, res, next) {
  //     BlogPost.deleteOne({ _id: req.params.id}, req.body)
  //         .then(() => res.redirect('back'))
  //         .catch(next)
  // }

  // [DELETE] /news/:id/ Soft Delete
  delete(req, res, next) {
    BlogPost.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // [PATCH] /news/:id/restore
  restore(req, res, next) {
    BlogPost.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

module.exports = new NewsController();
