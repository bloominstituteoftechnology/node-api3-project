// require your server and launch it
const server = require('./api/server.js');

server.listen(5000, () => {
  console.log('\n* Server Running on http://localhost:5000 *\n');
});