const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const { logger } = require('./middleware/middleware');

const server = express();

const usersRouter = require('./users/users-router');

server.use(express.json());
server.use(morgan('tiny'));
server.use(cors());
server.use(helmet());

server.use('/api/users', logger, usersRouter);

// const usersRouter =require('./users/users-router');

// global middlewares and the user's router need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('*', (req, res, next) => {
  // catch all 404 errors middleware
  next(res.status(404).json({ message: `user not found` }))
});


module.exports = server;

// function customMiddleware(req, res, next) { 
//   console.log('web 47 rocks!')
//   if (req.query.short == 'circuit') {
//     res.json('short circuited!')
//   } else {
//     next() 
//   }
// }
