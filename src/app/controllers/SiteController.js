class SiteController {

    // [GET] /home
    index(req, res) {
        res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }

    // [GET] /profile
    profile(req, res) {
        if (req.isAuthenticated()) res.render("profile", { user: req.user });
        else res.redirect("/auth/login");
    }
}

module.exports = new SiteController;