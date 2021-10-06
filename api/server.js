const express = require('express');
const server = express();
const userRouter = require('./users/users-router.js')
const mw = require('./middleware/middleware.js')

server.use('/api/users', userRouter);
server.use(express.json());
server.use(mw.logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
