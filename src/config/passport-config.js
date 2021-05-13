const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const AuthController = require("../app/controllers/AuthController");

passport.serializeUser(AuthController.serializeUser);
passport.deserializeUser(AuthController.deserializeUser);
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
    },
    AuthController.authenticate
  )
);
