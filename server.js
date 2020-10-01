const express = require('express');
const server = express();
const usersRouter = require('./users/userRouter');
const postsRouter = require('./posts/postRouter');

//custom middleware
function logger(req, res, next) {
  console.log(
    ' Method:',
    req.method,
    '\n',
    'Request URL:',
    req.url,
    '\n',
    'Date:',
    Date()
  );
  next();
}

server.use(express.json());
server.use(logger);
// server.use(validateUserId);
// server.use(validateUser);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

module.exports = server;
