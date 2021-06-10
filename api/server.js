const express = require('express');
const server = express();
const userRouter = require('./users/users-router');
const postsRouter = require('./posts/posts-router');
const {
  logger,
  // validateUserId,
  // validateUser,
  // validatePost,
} = require('./middleware/middleware');

//json parser
server.use(express.json());

// global middlewares and the user's router need to be connected here
server.use( logger);
server.use( '/api/users', userRouter )
server.use( logger );
server.use( '/api/posts', postsRouter )

//server set up
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
module.exports = server;