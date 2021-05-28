var authRouter = require("./auth");
var meRouter = require("./me");
var blogRouter = require("./Blog");
var siteRouter = require("./site");
var aboutRouter = require("./about");
var commentRouter = require("./comment.js");
var mailRouter = require("./Mail.js");

function route(app) {
  app.use("/mail", mailRouter);

  app.use("/auth", authRouter);

  app.use("/me", meRouter);

  app.use("/blog", blogRouter);

  app.use("/comment", commentRouter);

  app.use("/about", aboutRouter);

  app.use("/", siteRouter);

  app.use((req, res) => {
    res.status(404).render("home");
  });
}

module.exports = route;
