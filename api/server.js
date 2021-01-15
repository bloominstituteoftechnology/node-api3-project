const express = require('express');
const postsRouter = require('./posts/posts-router');
const usersRouter = require('./users/users-router');
const Middleware = require('./middleware/middleware');

const server = express();

server.use(express.json());

// global middlewares and routes need to be connected here

server.use(Middleware.logger);
server.use('/api/posts', postsRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
