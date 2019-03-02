const models = require('../models/');

module.exports = {
    homepage: (req, res) => {
        models.Book.findAll()
            .then(result => {
                res.render('homepage', {
                    loggedIn: req.isAuthenticated(),
                    title: 'Homepage',
                    books: result,
                    displayChat: false
                });
            })
    },
    login: (req, res) => {
        if (req.isAuthenticated()) {
            res.render('form', {
                loggedIn: req.isAuthenticated(),
                title: 'Form',
                id: req.user.id,
                displayChat: false
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
        models.Post.findAll({
            where: {
                UserId: req.user.id
            },
            include: [models.Book]
        }).then(results => {
            const books = results;
            res.render('dashboard', {
                loggedIn: req.isAuthenticated(),
                title: 'Dashboard',
                books: books,
                user: req.user,
                displayChat: true
            });
        }).catch(error => {
            console.log(error);
        });
    },
    team: (req, res) => {
        res.render('wiifat', {
            loggedIn: req.isAuthenticated(),
            title: 'Team',
            user: req.user,
            displayChat: false
        });
    },
    logout: (req, res) => {
        req.session.destroy(err => {
            res.redirect('/');
        });
    },
    editBook: (req, res) => {
        let id = req.params.id;
        console.log(id);
        // get book information
        models.Post.findAll({
            where: {
                BookId: id
            },
            include: [models.Book]
        }).then(results => {
            let obj;
            // if signed in
            if (req.isAuthenticated()) {
                obj = {
                    loggedIn: true,
                    user: req.user,
                    title: 'Book',
                    book: results[0].Book,
                    posts: results,
                    displayChat: true
                }
            }
            // not signed in
            else {
                obj = {
                    loggedIn: false,
                    title: 'Book',
                    book: results[0].Book,
                    posts: results,
                    displayChat: false
                }
            }
            res.render('book', obj);
        }).catch(error => {
            console.log(error);
        });
    },
    chat: (req, res) => {
        res.render('chat', {
            loggedIn: req.isAuthenticated(),
            user: req.user,
            title: 'Chat',
            isChat: true
        });
    }
}