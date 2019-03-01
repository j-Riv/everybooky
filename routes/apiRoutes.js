const apiController = require('../controllers/apiController.js');

module.exports = function(app, passport) {

    app.get('/api/books', apiController.getBooks);

    app.post('/api/book', apiController.createBook);

    app.put('/api/book/:id', apiController.updateBook);

    app.delete('/api/book/:id', apiController.deleteBook);

    // search
    app.get('/api/books/id/:id', apiController.searchBooksById);

    app.get('/api/books/:title', apiController.searchBooksByTitle);

    app.get('/api/books/author/:id', apiController.searchBooksByAuthor);

    app.get('/api/books/:genre', apiController.searchGenre);

    // posts
    app.post('/api/book/post', apiController.addPost);

    app.get('/api/books/:id/posts/', apiController.getPosts);

    // user
    app.get('/api/user/:id', apiController.getCurrentUser);

    app.put('/api/user/:id', apiController.updateUser);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) return next();
        res.status(403).end();
    }
};