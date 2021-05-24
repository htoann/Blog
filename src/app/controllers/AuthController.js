const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const { mongooseToObject } = require("../../until/mongoose");

class AuthController {
  getLogin = (req, res) => {
    if (!req.isAuthenticated()) res.render("auth/login");
    else res.redirect("/profile");
  };

  postLogin = (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/profile",
      failureRedirect: "/auth/login",
      failureFlash: true,
    })(req, res, next);
  };

  getSignup(req, res) {
    if (!req.isAuthenticated())
      res.render("auth/signup", { message: "", user: "" });
    else res.redirect("/profile");
  }

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

  getLogout(req, res) {
    if (req.isAuthenticated()) {
      req.logout();
      res.redirect("/auth/login");
    }
  }

  serializeUser = (user, done) => {
    done(null, user.username);
  };

  deserializeUser = (username, done) => {
    User.findOne({ username: username })
      .then((user) => {
        return done(null, mongooseToObject(user));
      })
      .catch(done);
  };

  authenticate = (username, password, done) => {
    User.findOne({ username: username.trim() })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "Username not found" });
        }
        if (bcrypt.compareSync(password.trim(), user.password)) {
          return done(null, mongooseToObject(user));
        } else return done(null, false, { message: "Password is incorrect" });
      })
      .catch(done);
  };
}

module.exports = new AuthController();
