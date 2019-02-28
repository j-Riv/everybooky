const models = require('../models/');

module.exports = {
    getBooks: function(req, res) {
        models.Book.findAll({}).then(results => {
            const booksObj = {
                books: results
            };
            console.log(booksObj);
            res.render('index', booksObj);
        }).catch(error => {
            console.error(error);
        });
    },
    searchBook: function(req, res) {
        models.Book.findAll({ where: { title: req.body.title } }).then(results => {
            let booksObj = {
                books: results
            };
            console.log(booksObj);
            res.render('index', booksObj);
        }).catch(error => {
            console.log(error);
        });
    },
    searchAuthor: function(req, res) {
        models.Author.findAll({where: {username: req.body.name}}).then(results => {
            let author = {
                name: results
            }
            console.log(author);
            res.render('index', author);
        }).catch(error => {
            console.log(error);
        })
    },
    createBook: function(req, res) {
        const book = req.body;
        models.Book.create({
            title: book.title,
            body: book.body,
            text_limit: book.limit,
            genre: book.genre
        }).then(result => {
            // res.redirect('/');
            // return res.status(200).end();
            let bookObj = {
                id: result.id,
                title: book.title
            }
            console.log('added book: ');
            console.log(bookObj);
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
    }
}