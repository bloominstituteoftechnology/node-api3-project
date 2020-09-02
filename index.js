// code away!
const server = require('./server.js');

const port = 8000;

server.listen(port, () => {
  console.log(`\n* Server Running on http://localhost:${port} *\n`);
});
