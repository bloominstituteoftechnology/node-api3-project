const express = require('express');
const usersRouter = require('./users/users-router.js')
const {logger} = require('./middleware/middleware.js')

const server = express();




server.use(logger)
server.use(express.json());
server.use('/api/users', usersRouter)

// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
