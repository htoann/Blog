const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const app = express();
const flash = require("express-flash");
const passport = require("passport");
const session = require("express-session");
const passportConfig = require("./config/passport-config");
const MongoDBStore = require("connect-mongodb-session")(session);
var route = require("./routes/index.js");

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));

let mongodbURI = process.env.DATABASE;
if (process.env.MONGODB_URL) {
  mongodbURI = process.env.MONGODB_URL;
}

mongoose
  .connect(mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    let port = process.env.PORT;
    if (port == null || port == "") {
      port = process.env.PORT;
    }
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  session({
    secret: "verysecret",
    resave: true,
    saveUninitialized: false,
    store: new MongoDBStore({
      uri: process.env.DATABASE,
      collection: "sessions",
      connectionOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

app.use(methodOverride("_method"));

// Template Engine
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

// Routes Init
route(app);
