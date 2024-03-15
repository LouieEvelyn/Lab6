var express = require('express');
var app = express();

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: false })); // to support URL-encoded bodies

var books = []; // Array to store book inventory

app.get('/', function(req, res) {
    res.redirect('/books/list');
});

app.get('/bookinventory/list', function(req, res) {
    var html = '<ul>';
    for (var i = 0; i < books.length; i++) {
        html += '<li>Title: ' + books[i].title + '</li>';
        html += '<li>Author: ' + books[i].author + '</li>';
        html += '<li>Publisher: ' + books[i].publisher + '</li>';
        html += '<li>Date: ' + books[i].date + '</li>';
        html += '<li>Website: ' + books[i].website + '</li><br>';
    }
    html += '</ul>';
    res.send('List of books: ' + html + '<br><a href="/books/add">Add a new book</a>');
});

app.get('/bookinventory/add', function(req, res) {
    var html = '<form action="/books/addbook" method="post">';
    html += '<label for="title">Title:</label><br>';
    html += '<input type="text" id="title" name="title"><br>';
    html += '<label for="author">Author:</label><br>';
    html += '<input type="text" id="author" name="author"><br>';
    html += '<label for="publisher">Publisher:</label><br>';
    html += '<input type="text" id="publisher" name="publisher"><br>';
    html += '<label for="date">Date:</label><br>';
    html += '<input type="text" id="date" name="date"><br>';
    html += '<label for="website">Website:</label><br>';
    html += '<input type="text" id="website" name="website"><br><br>';
    html += '<input type="submit" value="Submit"><br></form>';
    res.send('Insert book details: ' + html + '<br><a href="/books/list">List of books</a>');
});

app.post('/bookinventory/addbook', function(req, res) {
    console.log(req.body);
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        date: req.body.date,
        website: req.body.website
    };
    books.push(newBook);
    res.redirect('/books/list');
});

app.listen(3000);
