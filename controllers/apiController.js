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
    createBook: function(req, res) {
        const book = req.body;
        models.Book.create({
            title: book.title,
            body: book.body,
            text_limit: book.text_limit
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
    }
}