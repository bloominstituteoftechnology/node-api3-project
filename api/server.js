const express = require('express');
const userRoute = require('./users/users-router.js');
const postRoute = require('./posts/posts-router')
const { logger } = require('./middleware/middleware')

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
server.use(logger);
server.use('/api/users', userRoute)
server.use('/api/posts', postRoute)

// global middlewares and routes need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
