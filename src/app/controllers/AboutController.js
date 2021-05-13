class AboutController {
  getAbout(req, res) {
    res.render("about");
  }
}

module.exports = new AboutController();
