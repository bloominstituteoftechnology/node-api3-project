const express = require('express');

const usersRouter = require('./users/users-router');

const server = express();

const { 
  logger,
  validateUserId,
  validateUser,
  validatePost 
} = require('./middleware/middleware')

// remember express by default cannot parse JSON in request bodies

server.use(express.json());

// global middlewares and the user's router need to be connected here

server.use(logger)
server.use(validateUserId)
server.use(validateUser)
server.use(validatePost)

server.use(usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
