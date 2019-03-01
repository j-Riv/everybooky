const models = require('../models/');
const request = require('request');
const rp = require('request-promise');
const baseUrl = 'http://localhost:3000';

module.exports = {
    homepage: (req, res) => {
        res.render('homepage', {
            loggedIn: req.isAuthenticated(),
            title: 'Homepage'
        });
    },
    login: (req, res) => {
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
    dashboard: (req, res) => {
        let id = req.user.id;
        // http request
        console.log(id);
        let url = baseUrl + '/api/user/' + id;
        // get book information
        rp(url)
            .then(body => {
                body = JSON.parse(body);
                user = body.user;
                res.render('dashboard', {
                    loggedIn: req.isAuthenticated(),
                    title: 'Dashboard',
                    id: req.user.id,
                    user: user
                });
            }).catch(error => {
                console.error(error);
            });
    },
    team: (req, res) => {
        res.render('wiifat', {
            loggedIn: req.isAuthenticated(),
            title: 'Team',
        });
    },
    form: (req, res) => {
        res.render('form', {
            loggedIn: req.isAuthenticated(),
            id: req.user.id
        });
    },
    logout: (req, res) => {
        req.session.destroy(err => {
            res.redirect('/');
        });
    },
    book: (req, res) => {
        res.render('book', {
            loggedIn: req.isAuthenticated(),
            title: 'Book'
        });
    },
    editBook: (req, res) => {
        let id = req.params.id;
        let book;
        // http request
        console.log(id);
        let url = baseUrl + '/api/books/id/' + id;
        // get book information
        rp(url)
            .then(body => {
                body = JSON.parse(body);
                book = body.book;
                // get book posts
                if (book !== null) {
                    let url = baseUrl + '/api/books/' + book.id + '/posts';
                    rp(url)
                        .then(body => {
                            body = JSON.parse(body);
                            posts = body.posts;
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
                } else {
                    res.render('404', {
                        loggedIn: req.isAuthenticated(),
                        title: '404 | Not Found'
                    });
                }
            }).catch(error => {
                console.error(error);
            });
    }
}