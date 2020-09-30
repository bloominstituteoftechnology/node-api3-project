// code away!
const server = require('./server');

const port = 4000;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
