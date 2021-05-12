const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

const route = require('./routes/Index');
const db = require('./config/db');


//////////////////////////////////

const passport = require("passport");
const session = require("express-session");
const passportConfig = require("./config/passport.js");
const authRouter = require("./routes/Auth");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");
require("dotenv").config();


app.use(cors());
app.use(
    session({
        secret: "verysecret",
        resave: true,
        saveUninitialized: false,
        store: new MongoDBStore({
            //uri:
            url:
                //"mongodb+srv://root:root@cluster0.8g2jv.mongodb.net/BlogDatabase?retryWrites=true&w=majority",
                "mongodb://localhost:27017/tranhuutoan_blog_dev",
            collection: "sessions",
            connectionOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        }),
    })
);
app.use(passport.initialize());
app.use(passport.session());

/////////////////////////////////

// Connect DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
    extended: false,
}));
app.use(express.json());

app.use(methodOverride('_method'))

// Template Engine
app.engine('hbs', exphbs({
    extname: 'hbs',
    helpers: {
        sum: (a, b) => a + b,
    }
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

// Routes Init
route(app);