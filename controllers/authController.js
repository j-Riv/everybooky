const models = require('../models/');
let mode;;

function getMode() {
    models.Mode.findOne({
        where: {
            id: 1
        }
    }).then(result => {
        console.log('dark_mode');
        console.log(result.dataValues.dark_mode);
        mode = result.dataValues.dark_mode;
    });
    return mode;
}

module.exports = {
    homepage: (req, res) => {
        getMode();
        console.log('the mode');
        console.log(mode);
        models.Book.findAll()
            .then(result => {
                res.render('homepage', {
                    loggedIn: req.isAuthenticated(),
                    title: 'Everbooky | Write together and share forever',
                    books: result,
                    user: req.user,
                    displayChat: false,
                    mode: mode
                });
            });
    },
    getBooksSorted: (req, res) => {
        getMode();
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
                title: 'Everbooky | Write together and share forever',
                books: results,
                displayChat: false,
                mode: mode
            });
        }).catch(error => {
            console.error(error);
        });
    },
    login: (req, res) => {
        getMode();
        if (req.isAuthenticated()) {
            res.redirect('/dashboard');
        } else {
            res.render('login', {
                title: 'Log In / Sign Up',
                mode: mode
            });
        }
    },
    dashboard: (req, res) => {
        getMode();
        let id = req.user.id;
        // get book information
        models.Post.findAll({
            where: {
                UserId: req.user.id
            },
            include: [models.Book]
        }).then(results => {
            const books = results;
            // authored
            models.Book.findAll({
                where: {
                    author: req.user.id
                }
            }).then(results => {
                const authoredBooks = results;
                console.log(results);
                res.render('dashboard', {
                    loggedIn: req.isAuthenticated(),
                    title: 'Dashboard',
                    books: books,
                    authoredBooks: authoredBooks,
                    user: req.user,
                    displayChat: true,
                    mode: mode
                });
            }).catch(error => {
                console.error(error);
            });
            return false;
        }).catch(error => {
            console.log(error);
        });
    },
    team: (req, res) => {
        getMode();
        res.render('wiifat', {
            loggedIn: req.isAuthenticated(),
            title: 'Team',
            user: req.user,
            displayChat: false,
            mode: mode
        });
    },
    logout: (req, res) => {
        getMode();
        req.session.destroy(err => {
            res.redirect('/');
        });
    },
    editBook: (req, res) => {
        getMode();
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
                    displayChat: true,
                    mode: mode
                }
            }
            // not signed in
            else {
                obj = {
                    loggedIn: false,
                    title: 'Book',
                    book: results[0].Book,
                    posts: results,
                    displayChat: false,
                    mode: mode
                }
            }
            res.render('book', obj);
        }).catch(error => {
            console.log(error);
        });
    },
    searchBooksById: (req, res) => {
        getMode();
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
                user: req.user,
                mode: mode
            });
        }).catch(error => {
            console.log(error);
        });
    },
    searchBooksByTitle: (req, res) => {
        getMode();
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
                user: req.user,
                mode: mode
            });
        }).catch(error => {
            console.log(error);
        });
    },
    searchBooksByAuthor: (req, res) => {
        getMode();
        models.Post.findAll({
            where: {
                UserId: req.params.id
            },
            include: [models.Book]
        }).then(results => {
            let books = {
                booksObj: results,
                mode: mode
            };
            res.render('result', books);
        }).catch(error => {
            console.log(error);
        });
    },
    searchGenre: (req, res) => {
        getMode();
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
                user: req.user,
                mode: mode
            });
        }).catch(error => {
            console.log(error);
        });
    },
    privacyPolicy: (req, res) => {
        getMode();
        res.render('privacy-policy', {
            loggedIn: req.isAuthenticated(),
            title: 'Privacy Policy',
            displayChat: false,
            user: req.user,
            mode: mode
        });
    }
}