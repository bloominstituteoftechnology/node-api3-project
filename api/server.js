// const express = require('express');

// const server = express();

// // remember express by default cannot parse JSON in request bodies

// // global middlewares and routes need to be connected here

// server.get('/', (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`);
// });

// module.exports = server;



const express = require('express');
const helmet = require('helmet');
const { router } = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const userRouter = router;

const server = express();

server.use(express.json(), logger, helmet());

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} ${req.get('Origin')}`);
  next();
}

module.exports = server;