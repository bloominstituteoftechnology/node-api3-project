const express = require('express');
//step 1 - add routers
const postsRouter = require('./posts/postRouter.js');
const usersRouter = require('./users/userRouter.js');

//step 2 - add 3rd party middleware
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');


const server = express();
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//step 3 - hook up middleware functions 
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(logger);
server.use("/api/users", usersRouter);
server.use("/api/posts", postsRouter);


//step 4 connect to routers
server.use('/api/users', postsRouter, usersRouter);

server.use(cors());

server.get('/', (req, res, next) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// test things are working
server.delete('/', (req, res) =>{
  res.send('delete');
});

// function logger
function logger(req, res, next) {
  console.log(`${req.method} ${req.url} [${new Date().toISOString()}]`);
  next();
};

function errorHandler(error, req, res, next){
  console.log('error', error.message);
  const code = error.status || error.statusCode || 400;
  res.status(code).json(error);
};

server.use(errorHandler);

module.exports = server;
