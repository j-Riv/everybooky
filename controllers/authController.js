const models = require('../models/');

module.exports = {
    homepage: function(req, res) {
        res.render('homepage', {
            title: 'Homepage',
            loggedIn: req.isAuthenticated()
        });
    },
    login: function(req, res) {
        if (req.isAuthenticated()) {
            res.render('form', {
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
            title: 'Dashboard',
            id: req.user.id,
            loggedIn: req.isAuthenticated()
        });
    },
    team: function(req, res) {
        res.render('wiifat', {
            title: 'Team',
            loggedIn: req.isAuthenticated()
        });
    },
    form: function(req, res) {
        res.render('form', {
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