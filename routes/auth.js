const authController = require('../controllers/authController.js');

module.exports = function(app, passport) {

    app.get('/', authController.homepage);

    app.get('/sorted/:type', authController.getBooksSorted);

    app.get('/login', authController.login);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
    }));

    app.get('/dashboard', isLoggedIn, authController.dashboard);

    app.get('/team', authController.team);

    app.get('/book/:id', authController.editBook);

    app.get('/logout', authController.logout);

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
    }));

    // search
    app.get('/search/books/id/:id', authController.searchBooksById);

    app.get('/search/books/title/:title', authController.searchBooksByTitle);

    app.get('/search/books/author/:id', authController.searchBooksByAuthor);

    app.get('/search/books/genre/:genre', authController.searchGenre);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) return next();
        res.redirect('/login');
    }

};