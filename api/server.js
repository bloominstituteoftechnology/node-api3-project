const express = require('express');
const server = express();
const morgan = require("morgan");
const helmet = require("helmet");
const {logger} = require('./middleware/middleware');
const userRouter = require('./users/users-router')
// remember express by default cannot parse JSON in request bodies
server.use(express.json());
// global middlewares and the user's router need to be connected here
server.use(morgan('dev'));
server.use(express.json());
server.use(helmet());
server.use(logger)
server.use('/api/users', logger, userRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
