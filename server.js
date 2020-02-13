const express = require('express');
const postRouter = require('./posts/postRouter')
const {router} = require('./users/userRouter')
const server = express();

const usersRouter = router;

server.use(express.json(),logger);
server.use('/api/posts', postRouter)
server.use('/api/users', usersRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
function logger(req, res, next) {

  console.log(`${req.method} Request to ${req.originalUrl}`)

  next();
}


module.exports = server;
