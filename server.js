const postRouter = require("./posts/postRouter.js");
const userRouter = require("./users/userRouter.js")
const express = require('express');
const server = express();

//use it
server.use(express.json());
// server.use(logger);
server.use('/api/users', logger, userRouter); 

server.get('/', (req, res) => {
  console.log("req name is:", req.name)
  res.send(`
  <h2>Let's write some middleware!</h2>
  `);
});

//custom middleware

function logger(req, res, next) {
  const method = req.method;
  const date = Date.now();
  const endPoint = req.originalUrl;
  console.log(`${method} to ${endPoint} @ ${date}`)
  next();
}

module.exports = server;
