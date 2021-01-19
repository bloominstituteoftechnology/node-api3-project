const express = require('express');
const userRoute = require('./api/users/users-router.js');


const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
server.use('/api/users', userRoute)

// global middlewares and routes need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
