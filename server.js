const express = require('express');
const usersRouter = require('./users/userRouter');
const postsRouter = require('./posts/postRouter');
const server = express();

server.use(express.json());
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
// function validateUserId(id) {
//   return function (req, res, next) {
//     if (req.params.id) {
//       id = req.user;
//       next();
//     } else {
//       res.status(404).json({ message: 'Invalid user id' });
//     }
//   };
// }

// function validateUser(body) {
//   return function (req, res, next) {
//     if (req.body) {
//       next();
//     } else {
//       res.status(404).json({ message: 'Missing user data' });
//     }
//   };
// }

// function validatePost() {

// }

server.use(logger);
// server.use(validateUserId);
// server.use(validateUser);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

module.exports = server;
