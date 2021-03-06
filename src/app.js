const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./config/passport-config");
const methodOverride = require("method-override");
const MongoDBStore = require("connect-mongodb-session")(session);
const route = require("./routes/index.js");

require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));

const connectDatabase = require("./config/db.config");
connectDatabase();

app.use(
  session({
    maxAge: 60000,
    secret: "very-secret",
    resave: true,
    saveUninitialized: false,
    store: new MongoDBStore({
      uri: process.env.MONGO,
      collection: "sessions",
      connectionOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
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

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listen on http://localhost:${PORT}`);
});
