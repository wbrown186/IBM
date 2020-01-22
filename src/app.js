const path = require('path');
const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.redirect('/challenge1');
});

app.get('/challenge1', function (req, res) {
  res.sendFile(path.join(`${__dirname}/static/index.html`));
});

app.use(express.static('src/static'));

app.listen(3000, function () {
  console.log('Application started on port 3000');
});
