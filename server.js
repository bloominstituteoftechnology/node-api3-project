const express = require('express');
// const helmet = require('helmet');
const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter')

const server = express();

server.use(express.json());
// server.use(helmet());
server.use(logger);

server.use('/users', userRouter)
server.use('/posts', postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`Method: ${req.method} | URL: Request to ${req.originalUrl} | Timestamp: ${Date(Date.now).toString()}`);
    next();
}

module.exports = server;
