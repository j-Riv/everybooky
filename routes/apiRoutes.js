const apiController = require('../controllers/apiController.js');

module.exports = function(app, passport) {

    app.get('/api/books', apiController.getBooks);

    app.post('/api/book', isLoggedIn, apiController.createBook);

    app.put('/api/book/:id', isLoggedIn, apiController.updateBook);

    app.put('/api/book/complete/:id', isLoggedIn, apiController.completeBook);

    app.delete('/api/book/:id', isLoggedIn, apiController.deleteBook);

    // posts
    app.post('/api/book/post', isLoggedIn, apiController.addPost);

    app.get('/api/books/:id/posts/', apiController.getPosts);

    app.put('/api/books/post/', isLoggedIn, apiController.updatePost);

    // user
    app.get('/api/user/:id', isLoggedIn, apiController.getCurrentUser);

    app.put('/api/user/:id', isLoggedIn, apiController.updateUser);

    app.get('/api/users/book/:id', apiController.getUsersByBook);

    // mode
    app.put('/api/dark/', apiController.darkMode);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) return next();
        res.status(403).end();
    }
};