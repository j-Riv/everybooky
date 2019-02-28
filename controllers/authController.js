const models = require('../models/');

module.exports = {
    homepage: function(req, res) {
        res.render('homepage', {
            loggedIn: req.isAuthenticated(),
            title: 'Homepage'
        });
    },
    login: function(req, res) {
        if (req.isAuthenticated()) {
            res.render('form', {
                loggedIn: req.isAuthenticated(),
                title: 'Form',
                id: req.user.id
            });
        } else {
            res.render('login', {
                title: 'Log In / Sign Up'
            });
        }
    },
    dashboard: function(req, res) {
        res.render('dashboard', {
            loggedIn: req.isAuthenticated(),
            title: 'Dashboard',
            id: req.user.id
        });
    },
    team: function(req, res) {
        res.render('wiifat', {
            loggedIn: req.isAuthenticated(),
            title: 'Team',
        });
    },
    form: function(req, res) {
        res.render('form', {
            loggedIn: req.isAuthenticated(),
            id: req.user.id
        });
    },
    logout: function(req, res) {
        req.session.destroy(function(err) {
            res.redirect('/');
        });
    },
    book: function(req, res) {
        res.render('book', {
            loggedIn: req.isAuthenticated(),
            title: 'Book'
        });
    },
    editBook: function(req, res) {
        let id = req.params.id;
        let book;
        // get book information
        models.Book.findOne({}).then(result => {
            book = result;
        }).catch(error => {
            console.error(error);
        });
        // get posts 
        models.Post.findAll({
            where: {
                BookId: id
            }
        }).then(posts => {
            console.log(posts);
            res.render('book', {
                loggedIn: req.isAuthenticated(),
                id: id,
                title: 'Book',
                bookTitle: book.title,
                description: book.body,
                genre: book.genre,
                posts: posts
            });
        }).catch(error => {
            console.error(error);
        });
    }
}