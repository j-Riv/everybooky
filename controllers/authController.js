const models = require('../models/');

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
        models.Post.findAll({
            where: {
                UserId: req.user.id
            },
            include: [models.Book]
        }).then(results => {
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
        let id = req.params.id;
        models.Book.findOne({
            where: {
                id: id
            }
        }).then(result => {
            let obj;
            // if signed in
            if (req.isAuthenticated()) {
                obj = {
                    loggedIn: true,
                    user: req.user,
                    title: 'Book',
                    book: result.dataValues
                }
            }
            // not signed in
            else {
                obj = {
                    loggedIn: false,
                    title: 'Book',
                    book: result.dataValues
                }
            }
            res.render('book', obj);
        }).catch(error => {
            console.log(error);
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
            console.log('this is it');
            console.log(results);
            if (results.length > 0) {
                let obj;
                // if signed in
                if (req.isAuthenticated()) {
                    obj = {
                        loggedIn: true,
                        user: req.user,
                        title: 'Book',
                        book: results[0].Book,
                        posts: results
                    }
                }
                // not signed in
                else {
                    obj = {
                        loggedIn: false,
                        title: 'Book',
                        book: results[0].Book,
                        posts: results
                    }
                }
                res.render('book', obj);
            }
            // else no posts
            else {
                models.Book.findOne({
                    where: {
                        id: id
                    }
                }).then(result => {
                    let nobj;
                    // if signed in
                    if (req.isAuthenticated()) {
                        nobj = {
                            loggedIn: true,
                            user: req.user,
                            title: 'Book',
                            book: result.dataValues
                        }
                    }
                    // not signed in
                    else {
                        nobj = {
                            loggedIn: false,
                            title: 'Book',
                            book: result.dataValues
                        }
                    }
                    return res.render('book', nobj);
                }).catch(error => {
                    console.log(error);
                });
            }
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