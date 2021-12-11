const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const { logger } = require('./middleware/middleware.js');
const server = express();
const usersRouter = require('./users/users-router.js');

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(logger)
server.use('/api/users', usersRouter)

// global middlewares and the user's router need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
