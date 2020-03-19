/* eslint-disable no-console */
const server = require('./server.js');

server.listen(6000, () => {
  console.log('\n*** Server Running on http://localhost:6000 ***\n');
});
