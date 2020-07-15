const express = require('express');
//step 1 - add routers
const postsRouter = require('./posts/postRouter.js');
const usersRouter = require('./users/userRouter.js');

//step 2 - add 3rd party middleware
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();

//step 3 - hook up middleware functions 
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(logger);

//step 4 connect to routers
server.use('/api/users', postsRouter, usersRouter);

server.get('/', (req, res, next) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// test things are working
server.delete('/', (req, res) =>{
  res.send('delete');
});

//custom middleware
function logger(req, res, next) {
  console.log(`${req.method} ${req.url} [${new Date().toISOString()}]`);
  next();
};


module.exports = server;
