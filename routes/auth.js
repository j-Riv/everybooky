const authController = require('../controllers/authController.js');

module.exports = function(app, passport) {

    app.get('/', authController.homepage);

    app.get('/login', authController.login);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
    }));

    app.get('/dashboard', isLoggedIn, authController.dashboard);

    app.get('/team', authController.team);

    app.get('/book', authController.book);

    app.get('/book/:id', authController.editBook);

    app.get('/logout', authController.logout);

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin'
    }));

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) return next();
        res.redirect('/login');
    }

    app.get('/form', authController.form);

};