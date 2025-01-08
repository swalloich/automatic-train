const express = require('express');
const app = express();
const homeController = require('./controllers/home');

app.get('/', homeController.getHome);

const DEFAULT_PORT = 3000;
app.listen(process.env.port || DEFAULT_PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.port || DEFAULT_PORT}`);
});