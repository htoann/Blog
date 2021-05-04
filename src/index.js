const path = require('path');
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const app = express()
const port = 3000

const route = require('./routes');
const db = require('./config/db');

// Connect DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
    extended: true
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