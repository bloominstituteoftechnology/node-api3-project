const express = require('express');
const userRouter = require('./users/userRouter.js')
const postRouter = require('./posts/postRouter.js')
const server = express();

server.use(express.json());

// server.get('/', (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`);
// });

server.use('/api/users', userRouter)
server.use('/api/users/:id/posts', postRouter)
server.use(logger);

//custom middleware

function logger(req, res, next) {
  const time = new Date().toISOString()
  console.log(`${time} ${req.method} ${req.url}`);
  next();
}



module.exports = server;
