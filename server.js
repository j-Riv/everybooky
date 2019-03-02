require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const passport = require('passport');
const session = require('express-session');
const env = require('dotenv').load();
const exphbs = require('express-handlebars');
const path = require('path');

const models = require('./models');

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/public', express.static('public'));
// app.use('/public', express.static(path.join(__dirname, 'public')));

// For Passport
// Session secret
app.use(session({
    secret: process.env.PASSPORT_SECRET,
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
        defaultLayout: 'main',
        helpers: {
            eachUnique: function(array, options) {
                // this is used for the lookup
                let dupCheck = {};
                // template buffer
                let buffer = '';
                array.forEach(function(book) {
                    let uniqueKey = book.Book.id;
                    // check if the book has been added already
                    if (!dupCheck[uniqueKey]) {
                        // here there are only unique values
                        dupCheck[uniqueKey] = true;
                        // add this in the template
                        buffer += options.fn(book);
                    }
                });
                // return the template compiled
                return buffer;
            }
        }
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
require('./routes/auth.js')(app, passport);
require('./routes/apiRoutes')(app, passport);

// Load passport strategies
require('./config/passport/passport.js')(passport, models.User);

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