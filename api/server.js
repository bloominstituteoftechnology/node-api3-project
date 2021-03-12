const express = require('express');
const usersRouter = require('./users/users-router');
// global middlewares and the user's router need to be connected here
const {logger} = require('./middleware/middleware')

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json(), logger)

server.use('/api/users', usersRouter); // why do we need this line?

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
