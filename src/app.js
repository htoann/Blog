const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const app = express();
const route = require("./routes/Index");
const flash = require("express-flash");
const passport = require("passport");
const session = require("express-session");
const passportConfig = require("./config/passport-config");
const authRouter = require("./routes/Auth");
const MongoDBStore = require("connect-mongodb-session")(session);
require("dotenv").config();

let mongodbURI =
  "mongodb+srv://root:root@cluster0.aj2mc.mongodb.net/tranhuutoan_blog_dev?retryWrites=true&w=majority";
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
      port = 3000;
    }
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });

// mongodb://localhost:27017/tranhuutoan_blog_dev

app.use(
  session({
    secret: "verysecret",
    resave: true,
    saveUninitialized: false,
    store: new MongoDBStore({
      url: "mongodb+srv://root:root@cluster0.aj2mc.mongodb.net/tranhuutoan_blog_dev?retryWrites=true&w=majority",
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

// app.listen(port, () => {
//   console.log(`App listening at http://localhost:${port}`);
// });

// Routes Init
route(app);
