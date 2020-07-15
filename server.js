const express = require('express');
const server = express();
const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');

server.use(express.json());

server.use(logger);

server.use('/api/posts', postRouter)
server.use('/api/users', userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} request`)
  next();
}

server.use((error, req, res, next) => {
  res.status(400).json({
    message: 'there was an error',
    error
  })
})

module.exports = server;
