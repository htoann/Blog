var authRouter = require("./auth");
var meRouter = require("./me");
var blogRouter = require("./blog");
var siteRouter = require("./site");
var aboutRouter = require("./about");

function route(app) {
  app.use("/auth", authRouter);

  app.use("/me", meRouter);

  app.use("/blog", blogRouter);

  app.use("/about", aboutRouter);

  app.use("/", siteRouter);

  app.use((req, res) => {
    res.status(404).render("home");
  });
}

module.exports = route;
