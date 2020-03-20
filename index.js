/* eslint-disable no-console */
require('dotenv').config();

const server = require('./server.js');

const port = process.env.PORT || 4000;
// if PORT is not defined in the .env file then use 5000 as a default port.

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
