const authRouter = require("./Auth");
const meRouter = require("./Me");
const blogRouter = require("./Blog");
const siteRouter = require("./Site");
const aboutRouter = require("./About");

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
