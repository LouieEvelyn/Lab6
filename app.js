var express = require('express');
var app = express();

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: false })); // to support URL-encoded bodies

var books = []; // Array to store book inventory

app.get('/', function(req, res) {
    res.redirect('/books/list');
});

app.get('/bookinventory/list', function(req, res) {
    
   var html = '<p>';
   for (var i = 0; i < books.length; i++) {
      html += 'Title: ' + books[i].title + ' ---- ';
      html += 'Author: ' + books[i].author + ' ---- ';
      html += 'Publisher: ' + books[i].publisher + ' ---- ';
      html += 'Date: ' + books[i].date + ' ---- ';
      html += 'Website: ' + books[i].website + '<br>';
    }
    html += '</p>';

   res.send('List of books: ' + html + '<br><a href="/bookinventory/add">Add a new book</a> ');
});
app.get('/bookinventory/add', function(req, res) {
    var html = '<br><form action="/books/addbook" method="post">';
  html += '<label for="title">Title:</label><br><input type="text" id="title" name="title"><br>';
  html += '<label for="author">Author:</label><br><input type="text" id="author" name="author"><br>';
  html += '<label for="publisher">Publisher:</label><br><input type="text" id="publisher" name="publisher"><br>';
  html += '<label for="date">Date:</label><br><input type="text" id="date" name="date"><br>';
  html += '<label for="website">Website:</label><br><input type="text" id="website" name="website"><br><br>';
  html += '<input type="submit" value="Submit"><br></form>';

  res.send('Insert book details: ' + html + '<br><a href="/books/list">List of books</a>');
});

app.post(/'bookinventory/addbook', function(req, res) {
    console.log(req.body);
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        date: req.body.date,
        website: req.body.website
    };
    books.push(newBook);
  res.send('Book: ' + newBook.title + ' is added!<br> <a href="/books/list">List of books</a>');
});

app.listen(3000);
