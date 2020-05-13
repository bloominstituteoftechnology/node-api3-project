const express = require('express');
const userRouter = require('./users/userRouter.js');

const server = express();
server.use(express.json());
server.use(logger);

server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`Server is Running 🏃`);
});

//custom Logger MiddleWare for every Request

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}

server.use(function(req, res) {
  res.status(404).send('No Data to Display 😔');
});
module.exports = server;
