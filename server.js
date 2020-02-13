const express = require('express');

const server = express();

const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');


server.use(express.json());

server.use('/api/users', logger, userRouter);
server.use('/api/posts', logger, postRouter);

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl} at ${Date()}`)
  next();
}




module.exports = server;
