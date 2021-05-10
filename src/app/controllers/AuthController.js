
class AuthController {

    login(req, res) {
        res.render('auth/login');
    }

    signup(req, res) {
        res.render('auth/signup');
    }
}

module.exports = new AuthController;