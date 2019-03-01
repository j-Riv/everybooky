const models = require('../models/');

module.exports = {
    getBooks: function(req, res) {
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
    createBook: function(req, res) {
        const book = req.body;
        models.Book.create({
            title: book.title,
            body: book.body,
            text_limit: book.limit,
            genre: book.genre
        }).then(result => {
            let bookObj = {
                id: result.id,
                title: book.title
            }
            console.log('added book: ');
            console.log(bookObj);
            return res.status(200).end();
            // req.io.emit('added book', bookObj);
        }).catch(error => {
            console.error(error);
        });
    },
    updateBook: function(req, res) {
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
    deleteBook: function(req, res) {
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
    searchBookId: function(req, res) {
        models.Book.findOne({ where: { id: req.params.id } }).then(results => {
            let bookObj = {
                book: results
            };
            console.log(bookObj);
            res.json(bookObj);
        }).catch(error => {
            console.log(error);
        });
    },
    searchBookTitle: function(req, res) {
        models.Book.findAll({ where: { title: req.params.title } }).then(results => {
            let booksObj = {
                books: results
            };
            console.log(booksObj);
            res.json(booksObj);
        }).catch(error => {
            console.log(error);
        });
    },
    searchBookAuthor: function(req, res) {
        models.User.findAll({ where: { username: req.params.username } }).then(results => {
            let author = {
                name: results
            }
            console.log(author);
            res.json(author);
        }).catch(error => {
            console.log(error);
        })
    },
    searchGenre: function(req, res) {
        models.Book.findAll({ where: { genre: req.params.genre } }).then(results => {
            let genreBook = {
                books: results
            }
            console.log(genreBook);
            res.json(genreBook);
        }).catch(error => {
            console.log(error);
        });
    },
    addPost: function(req, res) {
        models.Post.create({
            body: req.body.line,
            AuthorId: req.body.authorId,
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
    getPosts: function(req, res) {
        let id = req.params.id;
        models.Post.findAll({ where: { BookId: id } }).then(results => {
            const postsObj = {
                posts: results
            };
            console.log(postsObj);
            res.json(postsObj);
        }).catch(error => {
            console.error(error);
        });
    },
    getCurrentUser: function(req, res) {
        let id = req.params.id;
        models.User.findOne({ where: { id: id } }).then(result => {
            let userObj = {
                user: result
            };
            console.log(userObj);
            res.json(userObj);
        }).catch(error => {
            console.log(error);
        });
    }
}