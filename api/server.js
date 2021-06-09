const express = require('express');
const userRouter = require('./users/users-router');
// const postRouter = require('./posts/posts-model');

const {
  logger,
  // validateUserId,
  // validateUser,
  // validatePost,
} = require('./middleware');


const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());


// global middlewares and the user's router need to be connected here
server.use('/api/users/', logger, userRouter);
// server.use('/api/posts/', logger, postsRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
