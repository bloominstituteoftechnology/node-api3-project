const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
const server = express();
 server.use(express.json());

server.use(logger)
// server.use(validateUserId);
server.use('/api/users', userRouter);
server.use('/api/users/:id/posts', postRouter);
 
 
server.get('/',logger , (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );
  next();
}

module.exports = server;
