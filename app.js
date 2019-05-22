const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const redis = require("redis");
const redisStore = require('connect-redis')(session);
const client = redis.createClient();

require('dotenv').config();

const app = express();

app.disable('x-powered-by');
app.enable('trust proxy');

// Express detrás de un proxy
app.set('trust proxy', true);
app.set('trust proxy', 'loopback');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/public', express.static(path.join(__dirname, '/public')));

// Manejador de sesiones
app.use(session({
    store: new redisStore({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT, client: client, disableTTL: true }),
    secret: process.env.SESSION_SECRET,
    name: 'wakyma.Session',
    resave: false,
    saveUninitialized: true
}));

// Rutas
app.use('/', require('./routes/index'));
app.use('/veterinaria', require('./routes/veterinaria'));
app.use('/veterinarias', require('./routes/veterinarias'));


// Clean cache
app.use(function (req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;