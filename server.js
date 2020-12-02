const express = require('express'); 
const usersRouter = require('./users/userRouter'); 


const server = express();
//not custom middleware 
server.use(express.json()); 
//custom middleware

function logger(req, res, next) {}

server.use('/api/users', usersRouter); 

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
