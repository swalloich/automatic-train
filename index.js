const express = require('express');
const app = express();
require('./db').connect();

const homeRoute = require('./routes/home');
const contactsRoute = require('./routes/contacts');

app.use('/', homeRoute);
app.use('/contacts', contactsRoute);

const DEFAULT_PORT = 3000;
app.listen(process.env.port || DEFAULT_PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.port || DEFAULT_PORT}`);
});