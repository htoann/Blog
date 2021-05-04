class AboutController {

    // [GET] /ABOUT
    index(req, res) {
        res.render('about');
    }
}

module.exports = new AboutController;