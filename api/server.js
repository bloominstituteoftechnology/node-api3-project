const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();
const {logger} = require('./middleware/middleware');

const usersRouter = require('./users/users-router');
const postsRouter = require('./posts/posts-router');

const motd = process.env.MOTD || "hello world"

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
// global middlewares and routes need to be connected here
server.use(helmet());
server.use(morgan('dev'));

server.use('./api/users', usersRouter);
server.use('./api/posts', postsRouter);

server.get('/', logger, (req, res) => {
  res.send(`<h2>${motd}</h2>`);
});

module.exports = server;
