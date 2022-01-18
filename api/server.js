const express = require('express');

const server = express();
// const userRouter = require('../api/users')
const { logger } = require('./middleware/middleware')

// remember express by default cannot parse JSON in request bodies
server.use(express.json())
server.use(logger)
// global middlewares and the user's router need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
