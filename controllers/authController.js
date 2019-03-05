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
    getBooksSorted: (req, res) => {
        let sortType = req.params.type
        models.Book.findAll({}).then(results => {
            if (sortType === 'new') {
                results.sort((a, b) => (a.id < b.id) ? 1 : -1)
            } else if (sortType === 'popular') {
                results.sort((a, b) => (a.views < b.views) ? 1 : -1)
            }
            console.log(results);
            res.render('homepage', {
                loggedIn: req.isAuthenticated(),
                title: 'Homepage',
                books: results,
                displayChat: false
            });
        }).catch(error => {
            console.error(error);
        });
    },
    login: (req, res) => {
        if (req.isAuthenticated()) {
            res.redirect('/dashboard');
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
        // update views
        models.Book.findOne({
            where: {
                id: id
            }
        }).then(book => {
            return book.increment('views', { by: 1 });
        }).catch(error => {
            console.error(error);
        });
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
    searchBooksById: (req, res) => {
        models.Book.findOne({
            where: {
                id: req.params.id
            }
        }).then(results => {
            console.log(results);
            res.render('result', {
                loggedIn: req.isAuthenticated(),
                title: 'Results',
                booksObj: results,
                displayChat: false,
                user: req.user
            });
        }).catch(error => {
            console.log(error);
        });
    },
    searchBooksByTitle: (req, res) => {
        models.Book.findAll({
            where: {
                title: req.params.title
            }
        }).then(results => {
            res.render('result', {
                loggedIn: req.isAuthenticated(),
                title: 'Results',
                booksObj: results,
                displayChat: false,
                user: req.user
            });
        }).catch(error => {
            console.log(error);
        });
    },
    searchBooksByAuthor: (req, res) => {
        models.Post.findAll({
            where: {
                UserId: req.params.id
            },
            include: [models.Book]
        }).then(results => {
            let books = {
                booksObj: results
            };
            res.render('result', books);
        }).catch(error => {
            console.log(error);
        });
    },
    searchGenre: (req, res) => {
        models.Book.findAll({
            where: {
                genre: req.params.genre
            }
        }).then(results => {
            res.render('result', {
                loggedIn: req.isAuthenticated(),
                title: 'Results',
                booksObj: results,
                displayChat: false,
                user: req.user
            });
        }).catch(error => {
            console.log(error);
        });
    }
}