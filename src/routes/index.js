const authRouter = require('./auth');
const meRouter = require('./me');
const newsRouter = require('./news');
const siteRouter = require('./site');
const aboutRouter = require('./about');

function route(app) {

    app.use('/auth', authRouter);

    app.use('/me', meRouter);

    app.use('/news', newsRouter);

    app.use('/about', aboutRouter);

    app.use('/', siteRouter);
}

module.exports = route;