const express = require('express');
const server = express();
const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');

//middleware stack
server.use(express.json());
server.use(logger);

//custom middleware
function logger(req, res, next) {
  console.log(`
   Logger: ${req.method} request to ${req.url} at ${new Date().toISOString()}
  `)
  next();
}

//routes/endpoints
server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


module.exports = server;