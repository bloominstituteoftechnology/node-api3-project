const express = require('express');
const logger = require('./middleware/logger');

const server = express();
const userRouter = require('./users/userRouter')
const postRoutes = require('./posts/postRouter')


server.use(express.json())

server.use(logger)
server.use('/users', userRouter)
server.use('/posts', postRoutes)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

// function logger(req, res, next) {}??????????????????????????????

module.exports = server;
