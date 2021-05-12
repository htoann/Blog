const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/User.js");

class AuthController {

    // [GET] /login
    getLogin = (req, res) => {
        if (!req.isAuthenticated()) res.render("auth/login");
        else res.redirect("/profile");
    };

    // [POST] /login
    postLogin = (req, res, next) => {
        let message = "";
        let user = new User({
            username: req.body.username.trim(),
            password: bcrypt.hashSync(req.body.password.trim(), 10),
        });
        User.findOne({ username: user.username })
            .then((data) => {
                if (!data) {
                    message = "Username or password is incorrect";
                    return res.render("auth/login", {
                        message,
                        user,
                    });
                }
            })
            .catch((err) => res.send(err.message));
    }


    // passport.authenticate("local", {
    //     successRedirect: "/profile",
    //     failureRedirect: "/auth/signup",
    //     failureMessage: "Invalide Credential",
    // })(req, res, next);


    // [GET] /signup
    getSignup(req, res) {
        if (!req.isAuthenticated())
            res.render("auth/signup", { message: "", user: "" });
        else res.redirect("/profile");
    }

    // [POST] /signup
    postSignup(req, res) {
        let message = "";
        let user = new User({
            username: req.body.username.trim(),
            password: bcrypt.hashSync(req.body.password.trim(), 10),
            email: req.body.email.trim(),
        });
        User.findOne({ username: user.username })
            .then((data) => {
                if (!data) {
                    User.findOne({ email: user.email })
                        .then((data) => {
                            if (!data) {
                                return user.save();
                            } else {
                                message = "Email has already been used";
                                return res.render("auth/signup", { message, user });
                            }
                        })
                        .then((result) => {
                            passport.authenticate("local")(req, res, () => {
                                res.redirect("/profile");
                            });
                        })
                        .catch((err) => res.send(err.message));
                } else {
                    message = "Username has already been used";
                    return res.render("auth/signup", {
                        message,
                        user,
                    });
                }
            })
            .catch((err) => res.send(err.message));
    }

    // [GET] /logout
    getLogout(req, res) {
        if (req.isAuthenticated()) {
            req.logout();
            res.redirect("/");
        } else {
            res.redirect("/auth/login");
        }
    }

    serializeUser = (user, done) => {
        done(null, user.username);
    };

    deserializeUser = (username, done) => {
        User.findOne({ username: username })
            .then((user) => {
                return done(null, user);
            })
            .catch(done);
    };

    authenticate = (username, password, done) => {
        User.findOne({ username: username.trim() })
            .then((user) => {
                if (!user) {
                    return done(null, false);
                }
                if (bcrypt.compareSync(password.trim(), user.password)) {
                    return done(null, user);
                } else return done(null, false);
            })
            .catch(done);
    };
}

module.exports = new AuthController;