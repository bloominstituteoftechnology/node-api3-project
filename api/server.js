const express = require('express');
const { logger } = require('./middleware/middleware');
const usersRouter = require('./users/users-router');
const postsRouter = require('./posts/posts-router');

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());

// global middlewares and routes need to be connected here
server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
