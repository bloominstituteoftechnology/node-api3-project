const express = require('express');
const server = express();
const cors = require('cors');

const userRouter = require('./users/userRouter'); 
// const postsRouter = require('./posts/postRouter'); 

server.use(cors()); 
server.use(express.json()); 
server.use('/api/users', logger, userRouter); 
// server.use('/api/posts', postsRouter); 

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
//custom middleware

function logger(req, res, next) {
  let dateObject = new Date(); 
  let hours = dateObject.getHours(); 
  let minutes = dateObject.getMinutes(); 
  
  console.log(`A ${req.method} request was made to ${req.url} at ${hours}:${minutes}`);
  next(); 
}

module.exports = server;
