const authRouter = require('./Auth');
const meRouter = require('./Me');
const newsRouter = require('./News');
const siteRouter = require('./Site');
const aboutRouter = require('./about');

function route(app) {
    app.use('/auth', authRouter);

    app.use('/me', meRouter);

    app.use('/news', newsRouter);

    app.use('/about', aboutRouter);

    app.use('/', siteRouter);
}

module.exports = route;