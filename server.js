const express = require('express');
const userRouter = require('./users/userRouter')
const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(express.json())
server.use('/api/user', userRouter)
//custom middleware

//  ----- Moved logger into separate file to export it cleanly to accept parameters

module.exports = server;
