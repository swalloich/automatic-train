const express = require('express');
const app = express();
require('./db').connect();

app.use('/', require('./routes'));

const DEFAULT_PORT = process.env.port || 8080;
app.listen(process.env.port || DEFAULT_PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.port || DEFAULT_PORT}`);
});