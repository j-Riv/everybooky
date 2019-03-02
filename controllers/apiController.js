const models = require('../models/');

module.exports = {
    getBooks: (req, res) => {
        models.Book.findAll({}).then(results => {
            const booksObj = {
                books: results
            };
            console.log(booksObj);
            res.json(booksObj);
        }).catch(error => {
            console.error(error);
        });
    },
    createBook: (req, res) => {
        const book = req.body;
        models.Book.create({
            title: book.title,
            body: book.body,
            text_limit: book.limit,
            genre: book.genre,
            // type: book.type,
            // private: book.private
        }).then(result => {
            let bookObj = {
                id: result.id,
                title: book.title
            }
            console.log('added book: ');
            console.log(bookObj);
            return res.json(bookObj).status(200).end();
            // req.io.emit('added book', bookObj);
        }).catch(error => {
            console.error(error);
        });
    },
    updateBook: (req, res) => {
        models.Book.update({
            title: req.body.title
        }, {
            where: {
                id: req.params.id
            }
        }).then(result => {
            if (result.changedRows === 0) {
                // error id must not exist
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        }).catch(error => {
            console.error(error);
        });
    },
    deleteBook: (req, res) => {
        models.Book.destroy({
            where: {
                id: req.params.id
            }
        }).then(result => {
            if (result.affectedRows === 0) {
                // error id must not exist
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        }).catch(error => {
            console.error(error);
        });
    },
    searchBooksById: (req, res) => {
        models.Book.findOne({
            where: {
                id: req.params.id
            }
        }).then(results => {
            let bookObj = {
                book: results
            };
            console.log(bookObj);
            res.json(bookObj);
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
            let booksObj = {
                books: results
            };
            console.log(booksObj);
            res.json(booksObj);
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
            console.log(results);
            res.json(results).end();
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
            let genreBook = {
                books: results
            }
            console.log(genreBook);
            res.json(genreBook);
        }).catch(error => {
            console.log(error);
        });
    },
    addPost: (req, res) => {
        models.Post.create({
            body: req.body.line,
            UserId: req.body.userId,
            BookId: req.body.bookId
        }).then(result => {
            let postObj = {
                line: req.body.line
            }
            console.log('added line: ');
            console.log(postObj);
            req.io.emit('added line', postObj);
            res.status(200).end();
        }).catch(error => {
            console.error(error);
        });
    },
    getPosts: (req, res) => {
        let id = req.params.id;
        models.Post.findAll({
            where: {
                BookId: id
            }
        }).then(results => {
            const postsObj = {
                posts: results
            };
            console.log(postsObj);
            res.json(postsObj);
        }).catch(error => {
            console.error(error);
        });
    },
    getCurrentUser: (req, res) => {
        let id = req.params.id;
        models.User.findOne({
            where: {
                id: id
            }
        }).then(result => {
            let userObj = {
                user: result
            };
            console.log(userObj);
            res.json(userObj);
        }).catch(error => {
            console.log(error);
        });
    },
    updateUser: (req, res) => {
        let user = req.body;
        models.User.update({
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            about: user.about,
            photo: user.photo,
            email: user.email
        }, {
            where: {
                id: req.params.id
            }
        }).then(result => {
            if (result.changedRows === 0) {
                // error id must not exist
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        }).catch(error => {
            console.error(error);
        });
    }
}