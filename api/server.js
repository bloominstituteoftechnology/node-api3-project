const express = require('express');
const userRouter = require('./users/users-router.js')

const server = express();

// remember express by default cannot parse JSON in request bodies

server.use(express.json())

// global middlewares and the user's router need to be connected here

server.use('/api/users', userRouter)


server.get('/', (req, res) => {
  res.send(`premature abandonment of laser eyes demonstrates high time preference.`);
});

module.exports = server;
