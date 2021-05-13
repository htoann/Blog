class AboutController {
  About(req, res) {
    res.render("about");
  }
}

module.exports = new AboutController();
