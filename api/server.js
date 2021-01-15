const express = require('express');
const postsRouter = require('./posts/posts-router')
const userRouter = require('./users/users-router')
const server = express();
const helmet = require('helmet');
const cors = require('cors')
const {logger}  = require('./middleware/middleware')


// remember express by default cannot parse JSON in request bodies
server.use(express.json());
// global middlewares and routes need to be connected here
server.use('/api/posts', logger, postsRouter)
server.use('/api/users', logger, userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;