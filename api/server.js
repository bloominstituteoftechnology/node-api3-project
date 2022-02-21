
// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

const express = require('express');

const userRouter = require('./users/users-router.js');

const {logger} = require('./middleware/middleware');


const server = express();
server.use(express.json());

server.use('/api/users', logger, userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
 