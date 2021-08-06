class SiteController {
  getHome(req, res) {
    res.render("home", { user: req.user });
  }

  getProfile(req, res) {
    if (req.isAuthenticated()) res.render("profile", { user: req.user });
    else res.redirect("/auth/login");
  }
}

module.exports = new SiteController();
