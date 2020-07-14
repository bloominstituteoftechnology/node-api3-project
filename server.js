const express = require('express');
const helmet = require('helmet');
const middleware = require('./midWare.js');
const userRouter = require('./users/userRouter');

const server = express();
server.use(express.json());
server.use(helmet());

server.use(middleware.logger)
server.use('/api/users', userRouter);
server.use(middleware.addName);

server.get('/', (req, res) => {
   const nameInsert = req.name ? ` ${req.name}` : "";
  res.send(`
  <h2>Custom Middleware is located in the midWare.js file</h2>
  <p>An API created by ${nameInsert}</p>
  `);
  console.log('from /')
});

//custom middleware



module.exports = server;
