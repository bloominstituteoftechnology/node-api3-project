const express = require('express'); 
const usersRouter = require('./users/userRouter'); 
const postsRouter = require('./posts/postRouter');


const server = express();
//not custom middleware 
server.use(express.json()); 
//custom middleware

function logger(req, res, next) {
  // log request method, request url and timestamp 
  // run on every request 
  var today = new Date();
  var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  console.log(`Method: ${req.method} - Request URL: ${req.url} - Time of Request: ${time}`); 
  next();
}

server.use(logger);

server.use('/api/users', usersRouter); 
server.use('/api/posts', postsRouter); 

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
