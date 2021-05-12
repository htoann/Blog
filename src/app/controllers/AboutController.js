class AboutController {

    // [GET] /about
    index(req, res) {
        res.render('about');
    }
}

module.exports = new AboutController;