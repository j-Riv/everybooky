const apiController = require('../controllers/apiController.js');

module.exports = function(app, passport) {

    app.get('/api/books', apiController.getBooks);

    app.post('/api/book', apiController.createBook);

    app.put('/api/book/:id', apiController.updateBook);

    app.delete('/api/book/:id', apiController.deleteBook);

    // posts
    app.post('/api/book/post', apiController.addPost);

    app.get('/api/books/:id/posts/', apiController.getPosts);

    // user
    app.get('/api/user/:id', apiController.getCurrentUser);

    app.put('/api/user/:id', apiController.updateUser);

    app.get('/api/users/book/:id', apiController.getUsersByBook);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) return next();
        res.status(403).end();
    }
};