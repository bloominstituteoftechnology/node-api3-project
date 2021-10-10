const express = require('express');

const morgan = require('morgan')
const helmet = require('helmet')
const userRouter = require('./users/users-router.js');
const { logger } = require('./middleware/middleware.js');
const server = express();

server.use(express.json());


server.use(helmet())

server.use(morgan('dev'));
server.use(express.json());
server.use(logger)
server.use('/api/users', logger, userRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
module.exports = server;