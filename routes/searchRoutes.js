const apiController = require('../controllers/apiController');

module.exports = function(app, passport) {

    app.get('/api/books/:title', apiController.searchBook);

    app.get('api/books/:author', apiController.searchAuthor);

    app.get('api/books/:genre', apiController.searchGenre);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) return next();
        res.status(403).end();
    }
}