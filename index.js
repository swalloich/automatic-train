var express = require('express');
var app = express();

app.get('/', (req, res, next) => {
  res.send('Jacob Nelson');
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});