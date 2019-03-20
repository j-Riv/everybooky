const models = require('../models/');
let mode;

function darkMode(req) {
    if (req.isAuthenticated()) {
        mode = req.user.dark_mode;
    } else {
        mode = false;
    }
    return mode;
}

module.exports = {
    homepage: (req, res) => {
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
                    mode: darkMode(req)
                });
            });
    },
    getBooksSorted: (req, res) => {
        const sortType = req.params.type
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
                mode: darkMode(req)
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
                title: 'Log In / Sign Up',
                mode: darkMode(req)
            });
        }
    },
    dashboard: (req, res) => {
        const id = req.user.id;
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
                    mode: darkMode(req)
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
        res.render('wiifat', {
            loggedIn: req.isAuthenticated(),
            title: 'Team',
            user: req.user,
            displayChat: false,
            mode: darkMode(req)
        });
    },
    logout: (req, res) => {
        req.session.destroy(err => {
            res.redirect('/');
        });
    },
    editBook: (req, res) => {
        const id = req.params.id;
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
                    mode: darkMode(req)
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
                    mode: darkMode(req)
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
                user: req.user,
                mode: darkMode(req)
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
                user: req.user,
                mode: darkMode(req)
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
            const books = {
                booksObj: results,
                mode: darkMode(req)
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
                user: req.user,
                mode: darkMode(req)
            });
        }).catch(error => {
            console.log(error);
        });
    },
    privacyPolicy: (req, res) => {
        res.render('privacy-policy', {
            loggedIn: req.isAuthenticated(),
            title: 'Privacy Policy',
            displayChat: false,
            user: req.user,
            mode: darkMode(req)
        });
    }
}
