const models = require('../models/');
const request = require('request');
const rp = require('request-promise');

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
        let id = req.user.id;
        // http request
        console.log(id);
        let url = 'http://localhost:3000/api/user/' + id;
        // get book information
        rp(url)
            .then(function(body) {
                body = JSON.parse(body);
                user = body.user;
                res.render('dashboard', {
                    loggedIn: req.isAuthenticated(),
                    title: 'Dashboard',
                    id: req.user.id,
                    user: user
                });
            }).catch(function(error) {
                console.error(error);
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
        // http request
        console.log(id);
        let url = 'http://localhost:3000/api/books/id/' + id;
        // get book information
        rp(url)
            .then(function(body) {
                body = JSON.parse(body);
                book = body.book;
            }).catch(function(error) {
                console.error(error);
            });
        // get posts
        let postsURL = 'http://localhost:3000/api/books/' + id + '/posts';
        rp(postsURL)
            .then(function(body) {
                body = JSON.parse(body);
                posts = body.post;
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
            }).catch(function(error) {
                console.error(error);
            });
        // get book information
        // models.Book.findOne({}).then(result => {
        //     book = result;
        // }).catch(error => {
        //     console.error(error);
        // });
        // get posts 
        // models.Post.findAll({
        //     where: {
        //         BookId: id
        //     }
        // }).then(posts => {
        //     console.log(posts);
        //     res.render('book', {
        //         loggedIn: req.isAuthenticated(),
        //         id: id,
        //         title: 'Book',
        //         bookTitle: book.title,
        //         description: book.body,
        //         genre: book.genre,
        //         posts: posts
        //     });
        // }).catch(error => {
        //     console.error(error);
        // });
    }
}