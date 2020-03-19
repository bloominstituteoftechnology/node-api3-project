/* eslint-disable no-console */
const server = require('./server.js');

const port = process.env.SERVER_PORT || 4000;
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
