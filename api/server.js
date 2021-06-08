const express = require('express');
const morgan = require('morgan'); //gives request/response info
const helmet = require('helmet'); //protects headers
const userRoutes = require('./users/users-router.js');
const { logger } = require('./middleware/middleware.js')
const server = express();

server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());

server.use('/users', userRoutes);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
