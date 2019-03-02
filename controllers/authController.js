const models = require('../models/');
// const request = require('request');
// const rp = require('request-promise');
// const baseUrl = 'http://localhost:3000';

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
        // get book information
        models.Post.findAll({ where: { UserId: req.user.id }, include: [models.Book] }).then(results => {
            console.log(results);
            const books = results;
            res.render('dashboard', {
                loggedIn: req.isAuthenticated(),
                title: 'Dashboard',
                id: req.user.id,
                books: books,
                user: req.user
            });
        }).catch(error => {
            console.log(error);
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
        console.log(id);
        // get book information
        models.Post.findAll({ where: { BookId: id }, include: [models.Book] }).then(results => {
            console.log(results);
            // if signed in
            if (req.isAuthenticated()) {
                res.render('book', {
                    loggedIn: true,
                    user: req.user,
                    title: 'Book',
                    book: results[0].Book,
                    posts: results
                });
            }
            // not signed in
            else {
                res.render('book', {
                    loggedIn: false,
                    title: 'Book',
                    book: results[0].Book,
                    posts: results
                });
            }
        }).catch(error => {
            console.log(error);
        });
    }
}