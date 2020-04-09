const express = require('express');

const server = express();
server.use(logger);
server.use(express.json())

const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter')

server.use('/api/user', userRouter);
server.use('/api/user', postRouter);
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} from ${req.originalUrl} at ${new Date()}`)
  next();
}

module.exports = server;
