require('./db').connect();
require('./routes');

const DEFAULT_PORT = 3000;
app.listen(process.env.port || DEFAULT_PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.port || DEFAULT_PORT}`);
});