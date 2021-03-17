const express = require('express');

const server = express();

const {logger} = require('./middleware/middleware');
const usersRouter = require('./users/users-router');

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
// global middlewares and the user's router need to be connected here
server.use(logger);
server.use('/api/users', usersRouter);
// function logger(req, res, next) {
//   // DO YOUR MAGIC
//   console.log(`Method: ${req.method}, Url: http://${req.hostname}:5000${req.path}, Date and time: ${new Date()}`);
//   next();
// };

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
