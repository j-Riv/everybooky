require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const passport = require('passport');
const session = require('express-session');
const env = require('dotenv').load();
const exphbs = require('express-handlebars');

const models = require('./models');

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// For Passport
// Session secret
app.use(session({
    secret: 'keybaord cat',
    resave: true,
    saveUninitalized: true
}));
app.use(passport.initialize());
// Persistent login sessions
app.use(passport.session());

// Handlebars
app.engine(
    'handlebars',
    exphbs({
        defaultLayout: 'main'
    })
);
app.set('view engine', 'handlebars');

// Place this middleware before any other route definitions
// makes io available as req.io in all request handlers
app.use(function(req, res, next) {
    req.io = io;
    next();
});

// Routes
const authRoute = require('./routes/auth.js')(app, passport);
require('./routes/apiRoutes')(app, passport);
// require("./routes/htmlRoutes")(app);

// Load passport strategies
require('./config/passport/passport.js')(passport, models.user);

const syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
    syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
models.sequelize.sync(syncOptions).then(function() {
    http.listen(PORT, function() {
        console.log(
            '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
            PORT,
            PORT
        );
    });
});

module.exports = app;