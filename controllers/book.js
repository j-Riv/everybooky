// dependencies
const express = require('express');
const router = express.Router();
// import book
const models = require('../models/');

// Create the router for the app, and export the router at the end of your file.
router.get('/', (req, res) => {
    models.Books.findAll({}).then(results => {
        const booksObj = {
            books: results
        };
        console.log(booksObj);
        res.render('index', booksObj);
    }).catch(error => {
        console.error(error);
    });
});

router.post('/api/books', (req, res) => {
    const book = req.body;
    console.log('Book: ' + book);
    models.Books.create({
        book_name: book.book_name,
        completed: book.completed
    }).then(result => {
        // res.redirect('/');
        // return res.status(200).end();
        let bookObj = {
            id: result.id,
            book_name: book.book_name
        }
        req.io.emit('added book', bookObj);
    }).catch(error => {
        console.error(error);
    });
});

router.put('/api/books/:id', (req, res) => {
    models.Books.update({
        book_name: req.body.book_name
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
});

router.delete('/api/books/:id', (req, res) => {
    models.Burgers.destroy({
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
});

module.exports = router;