// get all the dependencies for this project
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');   
const Genre = require('./models/genre.js');
const Book = require('./models/book.js');

app.use(express.static(__dirname + '/frontEnd'));
app.use(bodyParser.json());

// connect to mongoose
mongoose.connect('mongodb://localhost/bookstore');
const db = mongoose.connection;



app.get('/', (req, res) => {
    res.send('Please use /api/books or /api/genres endpoints');
});

app.get('/api/genres', (req, res) => {
    Genre.getGenres((err, genres) => {
        if(err) {
            throw err;
        }
        res.json(genres);
    });
});

app.get('/api/books', (req, res) => {
    Book.getBooks((err, books) =>{
        if(err) {
            throw err;
        }
        res.json(books);
    });
});

app.get('/api/books/:_id', (req, res) => {
    Book.getBookById(req.params._id, (err, book) => {
        if(err) {
            throw err;
        }
        res.json(book);
    });
});

app.post('/api/genres', (req, res) => {
    var genre = req.body;
    Genre.addGenre(genre, (err, genre) => {
        if(err) {
            throw err;
        }
        res.json(genre);
    });
});

app.post('/api/books', (req, res) => {
    var book = req.body;
    Book.addBook(book, (err, book) => {
        if(err) {
            throw err;
        }
        res.json(book);
    });
});

app.put('/api/genres/:_id', (req, res) => {
    var id = req.params._id;
    var genre = req.body;
    Genre.updateGenre(id, genre, {}, (err, genre) => {
        if(err) {
            throw err;
        }
        res.json(genre);

    });
});

app.put('/api/books/:_id', (req, res) => {
    var id = req.params._id;
    var book = req.body;
    Book.updateBook(id, book, {}, (err, book) => {
        if(err) {
            throw err;
        }
        res.json(book);
    });
});

app.delete('/api/genres/:_id', (req, res) => {
    var id = req.params._id;
    Genre.deleteGenre(id, (err, genre) => {
        if(err) {
            throw err;
        }
        res.json(genre);
    });
});

app.delete('/api/books/:_id', (req, res) => {
    var id = req.params._id;
    Book.deleteBook(id, (err, book) => {
        if(err) {
            throw err;
        }
        res.json(book);
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});

