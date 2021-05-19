var authRouter = require("./Auth");
var meRouter = require("./Me");
var blogRouter = require("./Blog");
var siteRouter = require("./Site");
var aboutRouter = require("./About");

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
