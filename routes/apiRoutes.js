const apiController = require('../controllers/apiController.js');

module.exports = function(app, passport) {

    app.get('/api/books', apiController.getBooks);

    app.get('/api/books/:title', apiController.searchBook)

    app.post('/api/books', apiController.createBook);

    app.put('/api/books/:id', apiController.updateBook);

    app.delete('/api/books/:id', apiController.deleteBook);

    // posts
    app.post('/api/books/post', apiController.addPost);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) return next();
        res.status(403).end();
    }
};