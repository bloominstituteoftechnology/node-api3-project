const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const server = express();

const {logger} = require('./middleware/middleware')
//Routers
const usersRouter=require('./users/users-router')
const postsRouter=require('./posts/posts-router');
// remember express by default cannot parse JSON in request bodies
server.use(express.json());
// global middlewares and routes need to be connected here
server.use(cors());
server.use(helmet());
server.use(morgan('dev')); 

server.use('/api/users',usersRouter);
server.use('/api/posts',postsRouter);

server.get('/',logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//common error handler function
function errorHandler(error,req,res,next){
const code=error.status || error.statusCode || 400;
res.status(code).json(error.message);
}
//error handler middleware
server.use(errorHandler);

module.exports = server;
