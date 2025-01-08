const express = require('express');
const app = express();
const homeRoute = require('./routes/index');

app.use('/', homeRoute);

const DEFAULT_PORT = 3000;
app.listen(process.env.port || DEFAULT_PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.port || DEFAULT_PORT}`);
});