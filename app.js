var express = require('express');
var app = express();

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: false })); // to support URL-encoded bodies

var books = []; // Array to store book inventory

app.get('/', function(req, res) {
    res.redirect('/bookinventory/list');
});

app.get('/bookinventory/list', function(req, res) {
    var html = `
        <h2>List of Books</h2>
        <div class="list-group">
    `;
    for (var i = 0; i < books.length; i++) {
        html += `
            <div class="list-group-item">
                <h5>${books[i].title}</h5>
                <p><strong>Author:</strong> ${books[i].author}</p>
                <p><strong>Publisher:</strong> ${books[i].publisher}</p>
                <p><strong>Date:</strong> ${books[i].date}</p>
                <p><strong>Website:</strong> <a href="${books[i].website}" target="_blank">${books[i].website}</a></p>
            </div>
        `;
    }
    html += '</div><br><a class="btn btn-primary" href="/bookinventory/add">Add a new book</a>';
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Book Inventory</title>
            <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5">
                ${html}
            </div>
            <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        </body>
        </html>
    `);
});

app.get('/bookinventory/add', function(req, res) {
    var html = `
        <h2>Insert Book Details</h2>
        <form action="/bookinventory/addbook" method="post">
            <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" class="form-control">
            </div>
            <div class="form-group">
                <label for="author">Author:</label>
                <input type="text" id="author" name="author" class="form-control">
            </div>
            <div class="form-group">
                <label for="publisher">Publisher:</label>
                <input type="text" id="publisher" name="publisher" class="form-control">
            </div>
            <div class="form-group">
                <label for="date">Date:</label>
                <input type="text" id="date" name="date" class="form-control">
            </div>
            <div class="form-group">
                <label for="website">Website:</label>
                <input type="text" id="website" name="website" class="form-control">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <br><a class="btn btn-secondary" href="/bookinventory/list">List of books</a>
    `;
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Book Inventory</title>
            <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5">
                ${html}
            </div>
            <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        </body>
        </html>
    `);
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
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Book Inventory</title>
            <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5">
                <h2>Book Added</h2>
                <p>Book: ${newBook.title} is added!</p>
                <br><a class="btn btn-primary" href="/bookinventory/list">List of books</a>
            </div>
            <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        </body>
        </html>
    `);
});

app.listen(3000, function() {
    console.log('Server is running on http://localhost:3000');
});
