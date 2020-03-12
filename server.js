const express = require('express');
const userRouter = require('./users/userRouter')//import userRouter
const postRouter = require('./posts/postRouter')
const server = express();

//apply middleware(both express.json & logger)
server.use(express.json())
server.use(logger)
server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware(logger middleware to log our console)

function logger(req, res, next) {
const method = req.method
const endpoint = req.url 
const date = Date.now()
console.log(`${date} ${method} to ${endpoint}`)
next()  //next() is to jump to next middleware and prevent timeouts
}

module.exports = server;
